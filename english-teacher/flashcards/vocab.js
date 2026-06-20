const vocabularyData = [
    {
        english: "Entrance",
        pos: "(n.)",
        thai: "ทางเข้า",
        example: "We walked through the main park entrance.",
        note: "ใช้แทนคำว่า entry ในบริบททางเข้าอุทยาน"
    },
    {
        english: "Ancient",
        pos: "(adj.)",
        thai: "เก่าแก่, ดึกดำบรรพ์",
        example: "We visited an ancient forest in the mountains.",
        note: "ดีกว่าการใช้คำทั่วไปว่า 'old'"
    },
    {
        english: "Massive",
        pos: "(adj.)",
        thai: "ใหญ่โตมโหฬาร",
        example: "The national park has a massive waterfall.",
        note: "ใช้แทนคำว่า 'very big' เพื่อความเป็นธรรมชาติ"
    },
    {
        english: "Warning sign",
        pos: "(n.)",
        thai: "ป้ายเตือนอันตราย",
        example: "There is a warning sign near the whirlpool.",
        note: "ใช้ระบุป้ายตักเตือนเรื่องภัยอันตรายต่างๆ"
    },
    {
        english: "Whirlpool",
        pos: "(n.)",
        thai: "น้ำวน",
        example: "The river currents are strong and form a dangerous whirlpool.",
        note: "กระแสน้ำไหลวนอันตราย"
    },
    {
        english: "Flash flood",
        pos: "(n.)",
        thai: "น้ำป่าไหลหลาก",
        example: "Heavy rain can cause a sudden flash flood in this canyon.",
        note: "ภัยธรรมชาติน้ำป่าไหลหลากอย่างรวดเร็ว"
    },
    {
        english: "River bank",
        pos: "(n.)",
        thai: "ริมตลิ่ง, ริมฝั่งน้ำ",
        example: "Monkeys were sitting on the river bank looking for food.",
        note: "บริเวณชายฝั่งหรือริมฝั่งแม่น้ำ"
    },
    {
        english: "Reps",
        pos: "(n.)",
        thai: "จำนวนครั้งที่ยก/ทำซ้ำ (ย่อมาจาก repetitions)",
        example: "I managed 2 sets of 6 to 7 reps for each leg.",
        note: "ใช้ในการออกกำลังกายแทนคำว่า laps (ที่แปลว่ารอบ)"
    },
    {
        english: "Rest",
        pos: "(n./v.)",
        thai: "การพัก, พักผ่อน",
        example: "Take a short rest between sets.",
        note: "ระวังออกเสียงสับสนกับคำว่า less (ที่แปลว่าน้อยกว่า)"
    },
    {
        english: "Core",
        pos: "(n.)",
        thai: "แกนกลาง, กล้ามเนื้อแกนกลางลำตัว",
        example: "Tomorrow my workout will focus on endurance and core.",
        note: "ออกเสียงลงท้ายให้ต่างจากคำว่า call"
    },
    {
        english: "Endurance",
        pos: "(n.)",
        thai: "ความทนทาน, ความอึดของร่างกาย",
        example: "Running long distances builds your endurance.",
        note: "ความสามารถในการทนต่อความเหนื่อยล้าเป็นเวลานาน"
    },
    {
        english: "Challenge",
        pos: "(n./v.)",
        thai: "ความท้าทาย, ท้าทาย",
        example: "The new workout routine was a big challenge.",
        note: "สิ่งที่มีความยากแต่สนุกและคุ้มค่าที่จะลองทำ"
    },
    {
        english: "Express",
        pos: "(v.)",
        thai: "แสดงความรู้สึกหรือความคิดออกมา",
        example: "It is good to express your feelings when you are stressed.",
        note: "การแสดงออกทางอารมณ์ ความคิด หรือความรู้สึก"
    },
    {
        english: "Overwhelmed",
        pos: "(adj.)",
        thai: "รู้สึกท่วมท้น, รู้สึกว่าหนักหนาเกินรับมือไหว",
        example: "I felt overwhelmed by the amount of work today.",
        note: "ใช้อธิบายความรู้สึกเวลาเจอเรื่องหนักๆ หรือข้อมูลเยอะเกินไป"
    },
    {
        english: "Stranger",
        pos: "(n.)",
        thai: "คนแปลกหน้า",
        example: "A kind stranger helped me find the way.",
        note: "คนที่เราไม่รู้จักมาก่อน"
    },
    {
        english: "Reached",
        pos: "(v.)",
        thai: "ไปถึง, มาถึง (กริยาช่อง 2/3 ของ reach)",
        example: "We finally reached our destination after a long walk.",
        note: "ใช้เมื่อเราเดินทางไปถึงสถานที่ใดที่หนึ่ง"
    },
    {
        english: "Parking lot",
        pos: "(n.)",
        thai: "ลานจอดรถ",
        example: "The shopping mall has a large parking lot.",
        note: "พื้นที่หรือบริเวณที่จัดไว้สำหรับจอดรถ"
    },
    {
        english: "Raising",
        pos: "(v.)",
        thai: "การยกขึ้น, การเลี้ยงดู",
        example: "Raising weights is a good way to build strength.",
        note: "มาจากคำว่า raise แปลว่ายกขึ้น หรือเลี้ยงดู (เช่น เลี้ยงลูก/สัตว์)"
    },
    {
        english: "Explain",
        pos: "(v.)",
        thai: "อธิบาย",
        example: "Could you please explain what you are doing?",
        note: "ใช้แทนคำว่า expand ที่แปลว่าขยายขอบเขต"
    },
    {
        english: "Process",
        pos: "(n.)",
        thai: "ขั้นตอน, กระบวนการ",
        example: "Could you tell me more about the process?",
        note: "ขั้นตอนหรือกระบวนการทำงาน"
    },
    {
        english: "Optical shop",
        pos: "(n.)",
        thai: "ร้านแว่นตา",
        example: "I went to an optical shop.",
        note: "เช่น ร้าน LensKart"
    },
    {
        english: "Prescription glasses",
        pos: "(n.)",
        thai: "แว่นสายตา",
        example: "I decided to order prescription glasses.",
        note: "แว่นตาที่สั่งตัดตามค่าสายตาโดยเฉพาะ"
    },
    {
        english: "Try on",
        pos: "(phrasal v.)",
        thai: "ลองสวมใส่ (เสื้อผ้า, แว่นตา)",
        example: "I tried on glasses and I asked the staff about them.",
        note: "ใช้กับการลองสวมเสื้อผ้า แว่นตา หรือรองเท้า"
    },
    {
        english: "Deposit",
        pos: "(n./v.)",
        thai: "เงินมัดจำ, วางเงินมัดจำ",
        example: "I made a deposit and made the payment.",
        note: "การจ่ายเงินมัดจำล่วงหน้าเพื่อจองสินค้า"
    },
    {
        english: "Pickled vegetables",
        pos: "(n.)",
        thai: "ผักดอง",
        example: "I like to make pickled vegetables at home.",
        note: "ผักที่ผ่านกระบวนการดอง (น้ำเกลือหรือน้ำส้มสายชู)"
    },
    {
        english: "Sterilize",
        pos: "(v.)",
        thai: "ฆ่าเชื้อโรค (เช่น ขวดโหล)",
        example: "You need to sterilize the jar.",
        note: "การลวกน้ำร้อนเพื่อทำความสะอาดและฆ่าเชื้อขวดโหล"
    },
    {
        english: "Brine",
        pos: "(n.)",
        thai: "น้ำเกลือสำหรับใช้ดอง",
        example: "You need to submerge the vegetables in brine.",
        note: "น้ำผสมเกลือเข้มข้นที่ใช้สำหรับดองอาหาร"
    },
    {
        english: "Homemade yogurt",
        pos: "(n.)",
        thai: "โยเกิร์ตทำเอง",
        example: "I am making homemade yogurt.",
        note: "โยเกิร์ตที่ทำขึ้นทานเองที่บ้าน"
    },
    {
        english: "Yogurt starter",
        pos: "(n.)",
        thai: "หัวเชื้อโยเกิร์ต",
        example: "You need a yogurt starter to begin.",
        note: "หัวเชื้อที่มีจุลินทรีย์สำหรับทำโยเกิร์ต"
    },
    {
        english: "Fermentation",
        pos: "(n.)",
        thai: "กระบวนการหมัก",
        example: "Let it ferment for 8 to 12 hours.",
        note: "ขั้นตอนหรือกระบวนการหมักอาหารด้วยจุลินทรีย์"
    },
    {
        english: "Cover a lot of ground",
        pos: "(idiom)",
        thai: "ได้ครอบคลุมเนื้อหาหรือเรื่องราวไปเยอะมาก",
        example: "We covered a lot of ground in our session.",
        note: "สำนวนแปลว่าได้เรียนรู้หรือคุยไปหลายประเด็นมากในรอบเดียว"
    },
    {
        english: "Tough",
        pos: "(adj.)",
        thai: "ยากลำบาก, โหด, เหนียว (เนื้อ)",
        example: "Today's workout was very tough!",
        note: "ใช้พูดถึงงานที่ยาก การออกกำลังกายที่เหนื่อยมาก หรือเนื้อสัตว์ที่เคี้ยวยาก"
    },
    {
        english: "Appointment",
        pos: "(n.)",
        thai: "การนัดหมาย (ที่เป็นทางการ เช่น นัดหมอ นัดคุยงาน)",
        example: "I have a doctor's appointment at 3:00 PM.",
        note: "การนัดหมายเวลากับบุคคลอื่น ไม่ใช้กับการนัดเที่ยวเล่นทั่วไปกับเพื่อน (มักใช้ hang out หรือ meet up แทน)"
    }
];

