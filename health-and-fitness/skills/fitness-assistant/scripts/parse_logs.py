import os
import glob
import xml.etree.ElementTree as ET
import argparse

# หาตำแหน่งโฟลเดอร์เก็บไฟล์ log แบบสัมพัทธ์กับที่ตั้งของสคริปต์
script_dir = os.path.dirname(os.path.abspath(__file__))
logs_dir = os.path.abspath(os.path.join(script_dir, "../../../workout_logs"))

parser = argparse.ArgumentParser(description="Parse workout TCX logs.")
parser.add_argument("--files", nargs="*", help="ระบุชื่อไฟล์ .tcx ที่ต้องการให้ดึงข้อมูล (เช่น Zepp123.tcx) หากไม่ระบุจะดึงทั้งหมด")
args = parser.parse_args()

if args.files:
    tcx_files = []
    for f in args.files:
        basename = os.path.basename(f)
        tcx_files.append(os.path.join(logs_dir, basename))
else:
    tcx_files = glob.glob(os.path.join(logs_dir, "*.tcx"))

workouts = []

for file_path in tcx_files:
    try:
        tree = ET.parse(file_path)
        root = tree.getroot()
        
        # Garmin TCX namespace v2
        ns = {'ns': 'http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2'}
        
        activities = root.findall('.//ns:Activity', ns)
        for act in activities:
            sport = act.get('Sport')
            
            act_id = act.find('ns:Id', ns)
            date_str = act_id.text if act_id is not None else ""
            
            notes_el = act.find('ns:Notes', ns)
            notes = notes_el.text if notes_el is not None else ""
            
            laps = act.findall('ns:Lap', ns)
            total_time = 0.0
            total_dist = 0.0
            total_calories = 0
            avg_hr_vals = []
            max_hr_vals = []
            
            for lap in laps:
                time_sec = lap.find('ns:TotalTimeSeconds', ns)
                if time_sec is not None:
                    total_time += float(time_sec.text)
                    
                dist_m = lap.find('ns:DistanceMeters', ns)
                if dist_m is not None:
                    total_dist += float(dist_m.text)
                    
                cals = lap.find('ns:Calories', ns)
                if cals is not None:
                    total_calories += int(cals.text)
                    
                avg_hr = lap.find('ns:AverageHeartRateBpm/ns:Value', ns)
                if avg_hr is not None:
                    avg_hr_vals.append(float(avg_hr.text))
                    
                max_hr = lap.find('ns:MaximumHeartRateBpm/ns:Value', ns)
                if max_hr is not None:
                    max_hr_vals.append(float(max_hr.text))
            
            # Fallback if lap HR summaries are missing
            avg_hr_avg = sum(avg_hr_vals) / len(avg_hr_vals) if avg_hr_vals else 0.0
            max_hr_max = max(max_hr_vals) if max_hr_vals else 0.0
            
            if avg_hr_avg == 0.0 or max_hr_max == 0.0:
                hr_vals = []
                for tp in act.findall('.//ns:Trackpoint', ns):
                    hr = tp.find('ns:HeartRateBpm/ns:Value', ns)
                    if hr is not None:
                        hr_vals.append(float(hr.text))
                if hr_vals:
                    avg_hr_avg = sum(hr_vals) / len(hr_vals)
                    max_hr_max = max(hr_vals)
            
            # Calculate pace (min/km)
            pace = 0.0
            if total_dist > 0:
                pace = (total_time / 60.0) / (total_dist / 1000.0)
            
            workouts.append({
                'filename': os.path.basename(file_path),
                'date': date_str,
                'sport': sport,
                'notes': notes,
                'duration_min': total_time / 60.0,
                'distance_km': total_dist / 1000.0,
                'calories': total_calories,
                'avg_hr': avg_hr_avg,
                'max_hr': max_hr_max,
                'pace': pace
            })
    except Exception as e:
        print(f"Error parsing {file_path}: {e}")

# Sort by date
workouts.sort(key=lambda x: x['date'])

# Print Markdown table
print("# Workout Log Analysis Summary\n")
print(f"Found and analyzed **{len(workouts)}** workout records.\n")
print("| Date (B.E.) | Sport | Activity / Notes | Duration (min) | Distance (km) | Avg HR | Max HR | Pace (min/km) | Calories |")
print("|---|---|---|---|---|---|---|---|---|")
for w in workouts:
    pace_str = "-"
    if w['pace'] > 0:
        minutes = int(w['pace'])
        seconds = int((w['pace'] - minutes) * 60)
        pace_str = f"{minutes}:{seconds:02d}"
        
    date_display = w['date'].split('T')[0]
    sport_display = w['sport']
    notes_display = w['notes'] if w['notes'] else "-"
    
    print(f"| {date_display} | {sport_display} | {notes_display} | {w['duration_min']:.1f} | {w['distance_km']:.2f} | {w['avg_hr']:.0f} | {w['max_hr']:.0f} | {pace_str} | {w['calories']} |")
