/* ============================================================
   المنيو — هنا بتعدّل الأصناف والأسعار
   كل صنف:  { id, name, price, desc?, image?, available? }
   - id        : رقم/كود فريد لا يتكرر (لا تغيّره بعد النشر)
   - desc      : وصف تحت الاسم (اختياري)
   - image     : مسار صورة مثل "assets/img/crepe.jpg" (اختياري)
   - available : اكتب false لو الصنف خلص (يظهر "غير متاح")
   - badge     : مثل "الأكثر طلبًا" أو "جديد" (اختياري)
   ============================================================ */
window.MO7A_MENU = [
  {
    "id": "sec-mix",
    "icon": "⭐",
    "title": "ميكس موحا المميز",
    "nav": "ميكس موحا",
    "items": [
      {
        "id": "mix-1",
        "name": "كريب العالمي",
        "price": 130,
        "desc": "فريش + زنجر + سلامي"
      },
      {
        "id": "mix-2",
        "name": "كريب تشيكن السعادة",
        "price": 130,
        "desc": "زنجر + كفتة + سلامي"
      },
      {
        "id": "mix-3",
        "name": "كريب شيش على زنجر",
        "price": 130,
        "desc": "ميكس شيش طاووق وزنجر مقرمش"
      },
      {
        "id": "mix-4",
        "name": "كريب زنجر على برجر",
        "price": 130,
        "desc": "ميكس زنجر حار مع قطع البرجر"
      },
      {
        "id": "mix-5",
        "name": "كريب اسبيشيال موحا",
        "price": 160,
        "desc": "ميكس غني ولذيذ خاص بموحا"
      }
    ]
  },
  {
    "id": "sec-crepe-chicken",
    "icon": "🍗",
    "title": "كريب فراخ",
    "nav": "كريب فراخ",
    "items": [
      {
        "id": "crepe-chicken-1",
        "name": "كريب كرانتشي",
        "price": 70
      },
      {
        "id": "crepe-chicken-2",
        "name": "كريب بانية فريش",
        "price": 95
      },
      {
        "id": "crepe-chicken-3",
        "name": "كريب استربس زنجر",
        "price": 95
      },
      {
        "id": "crepe-chicken-4",
        "name": "كريب شاورما فراخ",
        "price": 95
      },
      {
        "id": "crepe-chicken-5",
        "name": "كريب شيش طاووق",
        "price": 95
      },
      {
        "id": "crepe-chicken-6",
        "name": "كريب فاهيتا فراخ",
        "price": 100
      }
    ]
  },
  {
    "id": "sec-crepe-meat",
    "icon": "🥩",
    "title": "كريب لحمة",
    "nav": "كريب لحمة",
    "items": [
      {
        "id": "crepe-meat-1",
        "name": "كريب برجر بلدي",
        "price": 70
      },
      {
        "id": "crepe-meat-2",
        "name": "كريب سوسيس",
        "price": 70
      },
      {
        "id": "crepe-meat-3",
        "name": "كريب كفتة على الفحم",
        "price": 90
      },
      {
        "id": "crepe-meat-4",
        "name": "كريب سجق بلدي",
        "price": 100
      },
      {
        "id": "crepe-meat-5",
        "name": "كريب لحمة بلدي مفروم",
        "price": 100
      },
      {
        "id": "crepe-meat-6",
        "name": "كريب ميكس لحوم",
        "price": 120
      },
      {
        "id": "crepe-meat-7",
        "name": "كريب شاورما لحمة بلدي",
        "price": 120
      }
    ]
  },
  {
    "id": "sec-burger",
    "icon": "🍔",
    "title": "برجر موحا",
    "nav": "برجر موحا",
    "items": [
      {
        "id": "burger-1",
        "name": "تشيكن زنجر استربس",
        "price": 90
      },
      {
        "id": "burger-2",
        "name": "سماش برجر",
        "price": 90
      },
      {
        "id": "burger-3",
        "name": "تشيكن أواكس",
        "price": 90
      },
      {
        "id": "burger-4",
        "name": "تشيكن تركي",
        "price": 100
      },
      {
        "id": "burger-5",
        "name": "سماش برجر موتزريلا",
        "price": 100
      },
      {
        "id": "burger-6",
        "name": "VIP لحمة",
        "price": 120,
        "desc": "لحمة + تركي + سلامي + أصابع موتزريلا"
      },
      {
        "id": "burger-7",
        "name": "VIP فريش",
        "price": 120,
        "desc": "فريش + تركي + سلامي + أصابع موتزريلا"
      },
      {
        "id": "burger-8",
        "name": "VIP زنجر",
        "price": 120,
        "desc": "زنجر + تركي + سلامي + أصابع موتزريلا"
      },
      {
        "id": "burger-9",
        "name": "دابل فريش",
        "price": 140
      },
      {
        "id": "burger-10",
        "name": "دابل سماش",
        "price": 140
      },
      {
        "id": "burger-11",
        "name": "دابل VIP",
        "price": 170
      },
      {
        "id": "burger-12",
        "name": "تريبيل (فراخ - لحمة)",
        "price": 220
      }
    ]
  },
  {
    "id": "sec-french",
    "icon": "🥖",
    "title": "سندوتش الفرنساوي",
    "nav": "الفرنساوي",
    "items": [
      {
        "id": "french-1",
        "name": "فرنساوي بطاطس",
        "price": 25
      },
      {
        "id": "french-2",
        "name": "فرنساوي بطاطس شيدر",
        "price": 30
      },
      {
        "id": "french-3",
        "name": "فرنساوي بطاطس موتزريلا",
        "price": 40
      },
      {
        "id": "french-4",
        "name": "فرنساوي سوسيس",
        "price": 40
      },
      {
        "id": "french-5",
        "name": "فرنساوي كفتة على الفحم",
        "price": 50
      },
      {
        "id": "french-6",
        "name": "فرنساوي سجق بلدي",
        "price": 60
      },
      {
        "id": "french-7",
        "name": "فرنساوي شاورما فراخ",
        "price": 60
      },
      {
        "id": "french-8",
        "name": "فرنساوي شيش طاووق",
        "price": 60
      },
      {
        "id": "french-9",
        "name": "فرنساوي استربس زنجر",
        "price": 60
      },
      {
        "id": "french-10",
        "name": "فرنساوي بانية فريش",
        "price": 60
      },
      {
        "id": "french-11",
        "name": "فرنساوي شاورما لحم",
        "price": 70
      },
      {
        "id": "french-12",
        "name": "سوبر موحا",
        "price": 90
      }
    ]
  },
  {
    "id": "sec-roll",
    "icon": "🌯",
    "title": "رول موحا",
    "nav": "رول موحا",
    "items": [
      {
        "id": "roll-1",
        "name": "رول زنجر",
        "price": 110
      },
      {
        "id": "roll-2",
        "name": "رول فريش",
        "price": 110
      },
      {
        "id": "roll-3",
        "name": "رول شاورما",
        "price": 110
      },
      {
        "id": "roll-4",
        "name": "رول ميكس",
        "price": 160
      }
    ]
  },
  {
    "id": "sec-worqa",
    "icon": "🥘",
    "title": "ورقة موحا البلدي",
    "nav": "ورقة موحا",
    "items": [
      {
        "id": "worqa-1",
        "name": "ورقة لحمة بلدي",
        "price": 200
      },
      {
        "id": "worqa-2",
        "name": "ورقة سجق بلدي",
        "price": 200
      },
      {
        "id": "worqa-3",
        "name": "ورقة كبدة بلدي",
        "price": 200
      }
    ]
  },
  {
    "id": "sec-extra",
    "icon": "🍟",
    "title": "إضافات موحا",
    "nav": "إضافات",
    "items": [
      {
        "id": "extra-1",
        "name": "صوص شيدر",
        "price": 5
      },
      {
        "id": "extra-2",
        "name": "أصابع موتزريلا",
        "price": 20
      },
      {
        "id": "extra-3",
        "name": "صوص بيج تيستي",
        "price": 20
      },
      {
        "id": "extra-4",
        "name": "إضافة موتزريلا",
        "price": 20
      },
      {
        "id": "extra-5",
        "name": "إضافة بطاطس",
        "price": 20
      },
      {
        "id": "extra-6",
        "name": "إضافة سلامي",
        "price": 20
      },
      {
        "id": "extra-7",
        "name": "إضافة تركي",
        "price": 20
      },
      {
        "id": "extra-8",
        "name": "وش كونو",
        "price": 30
      },
      {
        "id": "extra-9",
        "name": "باكيت بطاطس",
        "price": 35
      },
      {
        "id": "extra-10",
        "name": "إضافة برجر",
        "price": 50
      },
      {
        "id": "extra-11",
        "name": "كريب بطاطس",
        "price": 50
      },
      {
        "id": "extra-12",
        "name": "إضافة فريش",
        "price": 50
      },
      {
        "id": "extra-13",
        "name": "إضافة زنجر",
        "price": 50
      },
      {
        "id": "extra-14",
        "name": "كريب ميكس جبن",
        "price": 120
      }
    ]
  }
];
