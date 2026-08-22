// composables/useProjects.js
// توجه: این دیتا هاردکد داخل فرانت‌اند است (نه از بک‌اند)، پس هدر X-Language
// اینجا کاربردی نداره. برای دوزبانه شدن، هر فیلد متنی یک نسخه‌ی «_en» هم دارد
// و بر اساس زبان فعلی سایت (useI18n) نسخه‌ی مناسب انتخاب می‌شود.
export const useProjects = () => {
  const { locale } = useI18n()

  const projectsData = {
    // --- پروژه‌های طراحی وب‌سایت ---
    1: {
      id: 1,
      type: 'web',
      title: 'همایش‌یار | سامانه مدیریت رویدادها',
      title_en: 'Hamayeshyar | Event Management System',
      subtitle: 'پروژه طراحی وب سایت',
      subtitle_en: 'Website Design Project',
      desc1: ' همایش‌یار یک شرکت فعال و متخصص در حوزه برنامه‌ریزی، مدیریت و اجرای انواع رویدادها از جمله همایش‌ها، نمایشگاه‌ها، جشنواره‌ها، سمینارها و رویدادهای سازمانی است. این مجموعه با بهره‌گیری از تیمی مجرب و رویکردی حرفه‌ای، تمامی مراحل برگزاری رویداد را از ایده‌پردازی و برنامه‌ریزی اولیه تا هماهنگی، اجرا و پشتیبانی نهایی مدیریت می‌کند. وب‌سایت همایش‌یار با هدف معرفی خدمات و توانمندی‌های مجموعه، ایجاد بستری برای ثبت درخواست و ارتباط با مشتریان، اطلاع‌رسانی درباره رویدادهای در حال برگزاری و رویدادهای آینده، و همچنین ارائه خدمات فروش و رزرو بلیت طراحی می‌شود. این سامانه تلاش می‌کند با فراهم کردن دسترسی آسان به اطلاعات، فرآیند برگزاری و شرکت در رویدادها را برای برگزارکنندگان و مخاطبان ساده‌تر، سریع‌تر و کارآمدتر کند. همچنین کاربران می‌توانند از طریق وب‌سایت از آخرین اخبار، برنامه‌ها و جزئیات رویدادها مطلع شده و تجربه‌ای بهتر و منظم‌تر از حضور در رویدادها داشته باشند. ',
      desc1_en: 'Hamayeshyar is an active company specializing in planning, managing, and executing all kinds of events, including conferences, exhibitions, festivals, seminars, and corporate events. Leveraging an experienced team and a professional approach, the company manages every stage of an event — from initial ideation and planning to coordination, execution, and final support. The Hamayeshyar website is designed to showcase the company\'s services and capabilities, provide a platform for submitting requests and connecting with clients, and share information about ongoing and upcoming events, along with ticket sales and reservation services.',
      desc2: ' همایش‌یار یک شرکت فعال و متخصص در حوزه برنامه‌ریزی، مدیریت و اجرای انواع رویدادها از جمله همایش‌ها، نمایشگاه‌ها، جشنواره‌ها، سمینارها و رویدادهای سازمانی است. این مجموعه با بهره‌گیری از تیمی مجرب و رویکردی حرفه‌ای، تمامی مراحل برگزاری رویداد را از ایده‌پردازی و برنامه‌ریزی اولیه تا هماهنگی، اجرا و پشتیبانی نهایی مدیریت می‌کند. وب‌سایت همایش‌یار با هدف معرفی خدمات و توانمندی‌های مجموعه، ایجاد بستری برای ثبت درخواست و ارتباط با مشتریان، اطلاع‌رسانی درباره رویدادهای در حال برگزاری و رویدادهای آینده، و همچنین ارائه خدمات فروش و رزرو بلیت طراحی می‌شود. این سامانه تلاش می‌کند با فراهم کردن دسترسی آسان به اطلاعات، فرآیند برگزاری و شرکت در رویدادها را برای برگزارکنندگان و مخاطبان ساده‌تر، سریع‌تر و کارآمدتر کند. همچنین کاربران می‌توانند از طریق وب‌سایت از آخرین اخبار، برنامه‌ها و جزئیات رویدادها مطلع شده و تجربه‌ای بهتر و منظم‌تر از حضور در رویدادها داشته باشند. ',
      desc2_en: 'The platform aims to make it easier, faster, and more efficient for organizers and attendees to access information and take part in events. Users can also stay up to date with the latest news, schedules, and event details through the website, ensuring a smoother and more organized experience overall.',
      customerName: 'سارا محمدی',
      customerName_en: 'Sara Mohammadi',
      customerRole: 'سمت فرد',
      customerRole_en: 'Position',
      customerFeedback: ' «همکاری با این مجموعه یکی از بهترین تجربه‌های کاری ما بود. از همان جلسات اولیه، نیازها و اهداف ما به‌خوبی درک شد و تمام مراحل پروژه با برنامه‌ریزی دقیق پیش رفت. کیفیت اجرای کار، سرعت پاسخگویی و توجه به جزئیات باعث شد نتیجه نهایی حتی بهتر از انتظارات ما باشد. از همکاری با این تیم بسیار رضایت داریم و قطعاً در پروژه‌های آینده نیز از خدمات آن‌ها استفاده خواهیم کرد.»',
      customerFeedback_en: '"Working with this team was one of our best professional experiences. From the very first meetings, our needs and goals were clearly understood, and every stage of the project moved forward with careful planning. The quality of execution, responsiveness, and attention to detail made the final result even better than we expected. We are extremely satisfied with this collaboration and will definitely use their services again for future projects."',
      images: ['/images/portfolio.jpg', '/images/portfolio.jpg', '/images/portfolio.jpg']
    },
    2: {
      id: 2,
      type: 'web',
      title: 'erdalink | سامانه مدیریت رویدادها',
      title_en: 'Erdalink | Event Management System',
      subtitle: 'پروژه طراحی وب سایت',
      subtitle_en: 'Website Design Project',
      desc1: 'توضیحات اختصاصی برای پروژه اردالینک...',
      desc1_en: 'Specific description for the Erdalink project...',
      desc2: 'بستر ثبت درخواست و ارتباط با مشتریان...',
      desc2_en: 'A platform for submitting requests and connecting with clients...',
      customerName: 'hannan',
      customerRole: 'سمت فرد',
      customerRole_en: 'Position',
      customerFeedback: 'نتیجه نهایی فراتر از انتظار ما بود...',
      customerFeedback_en: 'The final result exceeded our expectations...',
      images: ['/images/site2.jpg', '/images/site2.jpg', '/images/site2.jpg']
    },

    3: {
      id: 3,
      type: 'web',
      title: 'محتوای آموزشی | وب‌سایت تخصصی',
      title_en: 'Educational Content | Specialized Website',
      subtitle: 'پروژه تولید محتوا',
      subtitle_en: 'Content Production Project',
      desc1: 'تولید محتوای متنی و بصری برای شبکه‌های اجتماعی...',
      desc1_en: 'Producing text and visual content for social media...',
      desc2: 'استراتژی محتوا و تقویم سردبیری برای رشد برند...',
      desc2_en: 'Content strategy and editorial calendar for brand growth...',
      customerName: 'علی محمدی',
      customerName_en: 'Ali Mohammadi',
      customerRole: 'سمت فرد',
      customerRole_en: 'Position',
      customerFeedback: 'کیفیت محتوای تولید شده بسیار بالا و حرفه‌ای بود.',
      customerFeedback_en: 'The quality of the produced content was very high and professional.',
      images: ['/images/site3.jpg', '/images/site3.jpg', '/images/site3.jpg']
    },
    4: {
      id: 4,
      type: 'web',
      title: 'محتوای آموزشی | وب‌سایت تخصصی',
      title_en: 'Educational Content | Specialized Website',
      subtitle: 'پروژه تولید محتوا',
      subtitle_en: 'Content Production Project',
      desc1: 'تولید محتوای متنی و بصری برای شبکه‌های اجتماعی...',
      desc1_en: 'Producing text and visual content for social media...',
      desc2: 'استراتژی محتوا و تقویم سردبیری برای رشد برند...',
      desc2_en: 'Content strategy and editorial calendar for brand growth...',
      customerName: 'علی محمدی',
      customerName_en: 'Ali Mohammadi',
      customerRole: 'سمت فرد',
      customerRole_en: 'Position',
      customerFeedback: 'کیفیت محتوای تولید شده بسیار بالا و حرفه‌ای بود.',
      customerFeedback_en: 'The quality of the produced content was very high and professional.',
      images: ['/images/site3.jpg', '/images/site3.jpg', '/images/site3.jpg']
    },


    // --- پروژه‌های تولید محتوا ---

    5: {
      id: 5,
      type: 'content',
      title: 'محتوای آموزشی | وب‌سایت تخصصی',
      title_en: 'Educational Content | Specialized Website',
      subtitle: 'پروژه تولید محتوا',
      subtitle_en: 'Content Production Project',
      desc1: 'تولید محتوای متنی و بصری برای شبکه‌های اجتماعی...',
      desc1_en: 'Producing text and visual content for social media...',
      desc2: 'استراتژی محتوا و تقویم سردبیری برای رشد برند...',
      desc2_en: 'Content strategy and editorial calendar for brand growth...',
      customerName: 'علی محمدی',
      customerName_en: 'Ali Mohammadi',
      customerRole: 'سمت فرد',
      customerRole_en: 'Position',
      customerFeedback: 'کیفیت محتوای تولید شده بسیار بالا و حرفه‌ای بود.',
      customerFeedback_en: 'The quality of the produced content was very high and professional.',
      images: ['/images/content1.jpg', '/images/content1.jpg', '/images/content1.jpg']
    },
    6: {
      id: 6,
      type: 'content',
      title: 'محتوای آموزشی | وب‌سایت تخصصی',
      title_en: 'Educational Content | Specialized Website',
      subtitle: 'پروژه تولید محتوا',
      subtitle_en: 'Content Production Project',
      desc1: 'تولید محتوای متنی و بصری برای شبکه‌های اجتماعی...',
      desc1_en: 'Producing text and visual content for social media...',
      desc2: 'استراتژی محتوا و تقویم سردبیری برای رشد برند...',
      desc2_en: 'Content strategy and editorial calendar for brand growth...',
      customerName: 'علی محمدی',
      customerName_en: 'Ali Mohammadi',
      customerRole: 'سمت فرد',
      customerRole_en: 'Position',
      customerFeedback: 'کیفیت محتوای تولید شده بسیار بالا و حرفه‌ای بود.',
      customerFeedback_en: 'The quality of the produced content was very high and professional.',
      images: ['/images/content2.jpg', '/images/content2.jpg', '/images/content2.jpg']
    },
    7: {
      id: 7,
      type: 'content',
      title: 'محتوای آموزشی | وب‌سایت تخصصی',
      title_en: 'Educational Content | Specialized Website',
      subtitle: 'پروژه تولید محتوا',
      subtitle_en: 'Content Production Project',
      desc1: 'تولید محتوای متنی و بصری برای شبکه‌های اجتماعی...',
      desc1_en: 'Producing text and visual content for social media...',
      desc2: 'استراتژی محتوا و تقویم سردبیری برای رشد برند...',
      desc2_en: 'Content strategy and editorial calendar for brand growth...',
      customerName: 'علی محمدی',
      customerName_en: 'Ali Mohammadi',
      customerRole: 'سمت فرد',
      customerRole_en: 'Position',
      customerFeedback: 'کیفیت محتوای تولید شده بسیار بالا و حرفه‌ای بود.',
      customerFeedback_en: 'The quality of the produced content was very high and professional.',
      images: ['/images/content-service.jpg', '/images/content-service.jpg', '/images/content-service.jpg']
    },
    8: {
      id: 8,
      type: 'content',
      title: 'محتوای آموزشی | وب‌سایت تخصصی',
      title_en: 'Educational Content | Specialized Website',
      subtitle: 'پروژه تولید محتوا',
      subtitle_en: 'Content Production Project',
      desc1: 'تولید محتوای متنی و بصری برای شبکه‌های اجتماعی...',
      desc1_en: 'Producing text and visual content for social media...',
      desc2: 'استراتژی محتوا و تقویم سردبیری برای رشد برند...',
      desc2_en: 'Content strategy and editorial calendar for brand growth...',
      customerName: 'علی محمدی',
      customerName_en: 'Ali Mohammadi',
      customerRole: 'سمت فرد',
      customerRole_en: 'Position',
      customerFeedback: 'کیفیت محتوای تولید شده بسیار بالا و حرفه‌ای بود.',
      customerFeedback_en: 'The quality of the produced content was very high and professional.',
      images: ['/images/content3.jpg', '/images/content3.jpg', '/images/content3.jpg']
    },
    9: {
      id: 9,
      type: 'content',
      title: 'محتوای آموزشی | وب‌سایت تخصصی',
      title_en: 'Educational Content | Specialized Website',
      subtitle: 'پروژه تولید محتوا',
      subtitle_en: 'Content Production Project',
      desc1: 'تولید محتوای متنی و بصری برای شبکه‌های اجتماعی...',
      desc1_en: 'Producing text and visual content for social media...',
      desc2: 'استراتژی محتوا و تقویم سردبیری برای رشد برند...',
      desc2_en: 'Content strategy and editorial calendar for brand growth...',
      customerName: 'علی محمدی',
      customerName_en: 'Ali Mohammadi',
      customerRole: 'سمت فرد',
      customerRole_en: 'Position',
      customerFeedback: 'کیفیت محتوای تولید شده بسیار بالا و حرفه‌ای بود.',
      customerFeedback_en: 'The quality of the produced content was very high and professional.',
      images: ['/images/content-service.jpg', '/images/content-service.jpg', '/images/content-service.jpg']
    }
  };

  // فیلدهایی که نسخه‌ی «_en» دارند و باید بر اساس زبان فعلی جایگزین شوند
  const LOCALIZABLE_FIELDS = ['title', 'subtitle', 'desc1', 'desc2', 'customerName', 'customerRole', 'customerFeedback']

  function localizeProject(project) {
    if (!project) return project
    if (locale.value !== 'en') return project

    const localized = { ...project }
    for (const field of LOCALIZABLE_FIELDS) {
      const enKey = `${field}_en`
      if (project[enKey]) {
        localized[field] = project[enKey]
      }
    }
    return localized
  }

  // تابعی برای دسترسی به همه یا فیلتر شده‌ها (خروجی همیشه بر اساس زبان فعلی لوکالایز می‌شود)
  const getProjectsByType = (type) => {
    return Object.values(projectsData)
      .filter(p => p.type === type)
      .map(localizeProject)
  }

  const getProjectById = (id) => localizeProject(projectsData[id])

  return { projectsData, getProjectsByType, getProjectById }
};