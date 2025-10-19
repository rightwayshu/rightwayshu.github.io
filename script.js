// 等待 DOM 完全載入後再執行
document.addEventListener('DOMContentLoaded', () => {
  // 手機選單功能
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // 平滑滾動
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
      if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
      }
    });
  });

  // 翻轉功能
  let isFlipped = false;
  const flipBtn = document.getElementById('flipBtn');
  const mainImage = document.getElementById('mainImage');
  const initialContent = document.getElementById('initialContent');
  const flippedContent = document.getElementById('flippedContent');
  const philosophySection = document.getElementById('philosophy_space');

  // 替換的圖片URL（請替換成你實際的圖片路徑）
  const image1 = 'img/think.png';  // 初始顯示的圖片（對應三個詞條）
  const image2 = 'img/answer.png';     // 翻轉後的圖片（對應兩個詞條）

  // 恢復到初始狀態的函數
  function resetToInitial() {
    if (isFlipped) {
      isFlipped = false;

      // 恢復圖片
      mainImage.style.opacity = '0';
      mainImage.style.transform = 'rotateY(90deg)';

      setTimeout(() => {
        mainImage.src = image1;
        mainImage.style.transform = 'rotateY(0)';
        mainImage.style.opacity = '1';
      }, 300);

      // 恢復內容
      flippedContent.style.display = 'none';
      initialContent.style.display = 'block';
      initialContent.classList.add('flip-enter');

      setTimeout(() => {
        initialContent.classList.remove('flip-enter');
      }, 600);
    }
  }

  // 監聽滾動事件，控制按鈕顯示/隱藏
  if (flipBtn && philosophySection) {
    function checkScroll() {
      const rect = philosophySection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 判斷「我們的理念」區塊是否占滿整個畫面
      // rect.top <= 0 表示區塊頂部已經到達或超過視窗頂部
      // rect.bottom >= windowHeight 表示區塊底部還在視窗底部之下
      const isFullScreen = rect.top <= 80 && rect.bottom >= windowHeight - 100;
      // console.log("rect.top:", rect.top, "rect.bottom:", rect.bottom, "windowHeight:", windowHeight, "isFullScreen:", isFullScreen);

      if (isFullScreen) {
        flipBtn.style.opacity = '1';
        flipBtn.style.pointerEvents = 'auto';
      } else {
        flipBtn.style.opacity = '0';
        flipBtn.style.pointerEvents = 'none';
        // 離開區塊時恢復到初始狀態
        resetToInitial();
      }
    }

    // 初始檢查
    checkScroll();

    // 監聽滾動
    window.addEventListener('scroll', checkScroll);
  }

  if (flipBtn && mainImage && initialContent && flippedContent) {
    flipBtn.addEventListener('click', () => {
      isFlipped = !isFlipped;

      // 翻轉圖片
      mainImage.style.opacity = '0';
      mainImage.style.transform = 'rotateY(90deg)';

      setTimeout(() => {
        mainImage.src = isFlipped ? image2 : image1;
        mainImage.style.transform = 'rotateY(0)';
        mainImage.style.opacity = '1';
      }, 300);

      // 切換內容
      if (isFlipped) {
        initialContent.style.display = 'none';
        flippedContent.style.display = 'block';
        flippedContent.classList.add('flip-enter');
      } else {
        flippedContent.style.display = 'none';
        initialContent.style.display = 'block';
        initialContent.classList.add('flip-enter');
      }

      // 移除動畫類別
      setTimeout(() => {
        initialContent.classList.remove('flip-enter');
        flippedContent.classList.remove('flip-enter');
      }, 600);
    });
  }


 
});



// Team cards animation on scroll
// Carousel functionality
let currentSlide = 0;
const totalSlides = 6; // 總共6個成員
const itemsPerSlide = 3; // 每次顯示3個
const maxSlide = Math.ceil(totalSlides / itemsPerSlide) - 1;

function updateCarousel() {
  const track = document.getElementById('carouselTrack');
  const offset = -(currentSlide * 100);
  track.style.transform = `translateX(${offset}%)`;
  updateDots();
}

function moveCarousel(direction) {
  currentSlide += direction;
  if (currentSlide < 0) currentSlide = maxSlide;
  if (currentSlide > maxSlide) currentSlide = 0;
  updateCarousel();
}

function updateDots() {
  const dotsContainer = document.getElementById('carouselDots');
  dotsContainer.innerHTML = '';
  for (let i = 0; i <= maxSlide; i++) {
    const dot = document.createElement('div');
    dot.className = 'carousel-dot' + (i === currentSlide ? ' active' : '');
    dot.onclick = () => {
      currentSlide = i;
      updateCarousel();
    };
    dotsContainer.appendChild(dot);
  }
}

// 初始化
window.addEventListener('DOMContentLoaded', function () {
  updateDots();
});

// 自動輪播（可選）
// setInterval(() => {
//   moveCarousel(1);
// }, 15000);





/* ========================================
GSAP 動畫控制器 - 修正完整版
修正項目：

1. initializeLayout 使用 pageConfigs[1]（原本錯誤為 0）
2. 修正 updateCardContentWithAnimation 的邏輯（防止文字被清空後沒淡入）
3. 為第四頁（contentType: 'video'）提供「保持透明」的處理分支（使用者要求第四頁黃卡會變成透明）
4. 修正第三頁 -> 第四頁的時間軸錯誤（避免再次把 opacity 設為 0 的錯誤寫法）
   ======================================== */



document.addEventListener('DOMContentLoaded', function () {


    

  // ========================================
  // 變數宣告與元素選取
  // ========================================
  const productSection = document.getElementById('productSection');
  const yellowCard = document.getElementById('yellowCard');
  const blueCard = document.getElementById('blueCard');
  const dots = document.querySelectorAll('.dot');
  const hint = document.querySelector('.hint');
  const container = document.querySelector('.product-container');
  const phone = document.getElementById('phone');
  const phoneVideo = phone.querySelector('.phone-video');
  const videoSource = phoneVideo.querySelector('source');

  let currentPage = 1;           // 當前頁面
  const totalPages = 4;          // 總頁數
  let isAnimating = false;       // 動畫狀態鎖定
  let isSectionVisible = false;  // 區域可見性狀態

  // ========================================
  // 頁面配置定義 - 包含文字內容
  // ========================================
  const pageConfigs = {
    1: { // 第一頁：手機居中，左右卡片
      phone: { x: 0, y: 0, scale: 1, rotation: 0 },
      yellowCard: {
        x: -350, y: 0, scale: 1, opacity: 1, width: 300, height: 200,
        content: { title: "AI智能解析", text: "想到啥就說啥，AI會依你說的任何話給出最優景點推薦" }
      },
      blueCard: {
        x: 350, y: 0, scale: 1, opacity: 1,
        content: { title: "簡單好操作", text: "沒有過多複雜設計，點開即可輸入，就像chatGPT一樣" }
      },
      background: '#ffffff'
    },
    2: { // 第二頁：手機左側，右側卡片
      phone: { x: -250, y: 0, scale: 0.9, rotation: 0 },
      yellowCard: {
        x: 200, y: -150, scale: 1, opacity: 1, width: 300, height: 200,
        content: { title: "滑卡設計", text: "簡單左右滑動，喜歡不喜歡直接一點!告別選擇障礙" }
      },
      blueCard: {
        x: 200, y: 100, scale: 1, opacity: 1,
        content: { title: "AI修正", text: "忽然不喜歡了?肚子餓了?沒關係直接AI幫你推新地點" }
      },
      background: '#ffffff'
    },
    3: { // 第三頁：手機右側，左側黃色卡片
      phone: { x: 250, y: 0, scale: 0.9, rotation: 0 },
      yellowCard: {
        x: -200, y: 0, scale: 1.15, opacity: 1, width: 300, height: 200,
        content: { title: "共編系統", text: "不需抱怨誰挑的景點，大家一起參與!" }
      },
      blueCard: {
        x: 200, y: 100, scale: 0.8, opacity: 0,
        content: { title: "售後服務", text: "24小時客服支援，一年免費保修" }
      },
      background: '#ffffff'
    },
    4: { // 第四頁：手機居中，底部黃色視頻卡片（使用者希望此頁黃卡透明）
      phone: { x: 0, y: -50, scale: 0.9, rotation: 0 },
      yellowCard: {
        x: 0, y: 0, scale: 1, opacity: 0,   // 使用者要求：到第四頁時黃卡會變成透明
        width: 450, height: 150, contentType: 'video'
      },
      blueCard: { x: 200, y: 100, scale: 0.8, opacity: 0 },
      background: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 48%, #FFD700 52%, #FFA500 100%)',
    }
  };

  // ========================================
  // 初始化設定
  // ========================================

  // 設定初始狀態（第一頁）
  function initializeLayout() {
    // 修正：使用 pageConfigs[1]（第一頁）
    const config = pageConfigs[1];

    gsap.set(phone, {
      x: config.phone.x,
      y: config.phone.y,
      scale: config.phone.scale,
      rotation: config.phone.rotation
    });

    gsap.set(yellowCard, {
      x: config.yellowCard.x,
      y: config.yellowCard.y,
      scale: config.yellowCard.scale,
      opacity: config.yellowCard.opacity,
      width: config.yellowCard.width,
      height: config.yellowCard.height
    });

    gsap.set(blueCard, {
      x: config.blueCard.x,
      y: config.blueCard.y,
      scale: config.blueCard.scale,
      opacity: config.blueCard.opacity
    });

    gsap.set(productSection, {
      background: config.background
    });
    yellowCard.innerHTML = '';
    blueCard.innerHTML = '';



    // 立即設定文字（初始化不使用動畫）
    updateCardContentImmediate(yellowCard, config.yellowCard);
    updateCardContentImmediate(blueCard, config.blueCard);

    // 提示文字初始狀態
    gsap.set(productSection, { background: config.background });


  }

  // 重啟後函式
  function resetCardsToInitial() {
    const config = pageConfigs[1];

    gsap.set(phone, {
      x: config.phone.x,
      y: config.phone.y,
      scale: config.phone.scale,
      rotation: config.phone.rotation
    });

    gsap.set(yellowCard, {
      x: config.yellowCard.x,
      y: config.yellowCard.y,
      scale: config.yellowCard.scale,
      opacity: config.yellowCard.opacity,
      width: config.yellowCard.width,
      height: config.yellowCard.height
    });

    gsap.set(blueCard, {
      x: config.blueCard.x,
      y: config.blueCard.y,
      scale: config.blueCard.scale,
      opacity: config.blueCard.opacity
    });

    yellowCard.innerHTML = '';
    blueCard.innerHTML = '';
    updateCardContentImmediate(yellowCard, config.yellowCard);
    updateCardContentImmediate(blueCard, config.blueCard);

    gsap.set(productSection, { background: config.background });
  }


  // ========================================
  // 文字動畫相關函數
  // ========================================

  // 立即更新卡片內容（無動畫，用於初始化）
  function updateCardContentImmediate(cardElement, config) {
    if (!cardElement) return;


    if (config && config.contentType === 'video') {
      cardElement.innerHTML = `
    <video class="card-video" autoplay muted loop>
      <source src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4">
      您的瀏覽器不支持視頻標籤。
    </video>
  `;
    } else if (config && config.content) {
      cardElement.innerHTML = `
    <div class="card-content">
      <h3>${config.content.title}</h3>
      <p>${config.content.text}</p>
    </div>
  `;
    } else {
      // 若無內容，保留空白或預設
      cardElement.innerHTML = '';
    }


  }

  // 帶動畫的卡片內容更新函數（修正版）
  function updateCardContentWithAnimation(cardElement, config, animationDelay = 0) {
    // 防呆
    if (!cardElement || !config) return gsap.timeline();
    gsap.killTweensOf(cardElement);
    gsap.killTweensOf(cardElement.querySelectorAll('h3, p'));

    // 讀取當前 opacity
    const cardOpacity = Number(gsap.getProperty(cardElement, "opacity")) || 0;

    // 如果卡片完全透明且不是 video，跳過文字動畫（但仍回傳一個空 timeline 以保持調用安全）
    if (cardOpacity === 0 && config.contentType !== 'video') {
      // 如果卡片是隱藏的（例如被設計成未顯示），不做文字替換動畫
      return gsap.timeline();
    }

    const tl = gsap.timeline({ delay: animationDelay });

    // --- 影片處理 ---
    if (config.contentType === 'video') {
      // 如果目標頁面期望最後保持透明（opacity === 0），我們只替換內容但不淡入
      if (config.opacity === 0) {
        tl.to(cardElement, {
          opacity: 0,
          scale: 0.95,
          duration: 0.3,
          ease: "power2.in"
        })
          .call(() => {
            cardElement.innerHTML = `
        <video class="card-video" autoplay muted loop>
          <source src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4">
          您的瀏覽器不支持視頻標籤。
        </video>
      `;
          })
          // 保持隱藏（不淡入），但確保 scale 回復到設計值（若需要）
          .set(cardElement, { scale: config.scale || 1 });
        return tl;
      } else {
        // 正常流程：淡出舊內容 -> 換內容 -> 淡入新內容
        tl.to(cardElement, {
          opacity: 0,
          scale: 0.9,
          duration: 0.3,
          ease: "power2.in"
        })
          .call(() => {
            cardElement.innerHTML = `
        <video class="card-video" autoplay muted loop>
          <source src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4">
          您的瀏覽器不支持視頻標籤。
        </video>
      `;
          })
          .to(cardElement, {
            opacity: 1,
            scale: 1,
            duration: 0.45,
            ease: "power2.out"
          });
        return tl;
      }
    }

    // --- 文字內容處理 ---
    if (config.content) {
      const existingContent = cardElement.querySelector('.card-content');

      if (existingContent) {
        // 淡出舊文字（標題往上，內文往下）
        tl.to(existingContent.querySelectorAll('h3, p'), {
          opacity: 0,
          y: (i) => (i === 0 ? -20 : 20),
          duration: 0.25,
          ease: "power2.in",
          stagger: 0.05
        })
          .call(() => {
            // 替換新內容
            cardElement.innerHTML = `
        <div class="card-content">
          <h3>${config.content.title}</h3>
          <p>${config.content.text}</p>
        </div>
      `;
          })
          // 設定新文字初始狀態
          .set(cardElement.querySelector('h3'), { opacity: 0, y: 20 })
          .set(cardElement.querySelector('p'), { opacity: 0, y: -20 })
          // 淡入新文字
          .to(cardElement.querySelector('h3'), {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power3.out"
          }, "+=0.05")
          .to(cardElement.querySelector('p'), {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power3.out"
          }, "-=0.15");
      } else {
        // 沒有舊內容 -> 直接建立並淡入
        tl.call(() => {
          cardElement.innerHTML = `
        <div class="card-content">
          <h3>${config.content.title}</h3>
          <p>${config.content.text}</p>
        </div>
      `;
        })
          .set(cardElement.querySelector('h3'), { opacity: 0, y: 20 })
          .set(cardElement.querySelector('p'), { opacity: 0, y: -20 })
          .to(cardElement.querySelector('h3'), {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power3.out"
          })
          .to(cardElement.querySelector('p'), {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power3.out"
          }, "-=0.2");
      }
    }

    return tl;


  }

  // ========================================
  // 動畫時間軸創建函數
  // ========================================
  function createPageTransition(fromPage, toPage) { //
    const finalShow = document.querySelector('.final-show');
    const tl = gsap.timeline({
      onStart: () => { isAnimating = true; console.log(`開始從第${fromPage}頁切換到第${toPage}頁`); },
      onComplete: () => { isAnimating = false; console.log(`第${toPage}頁動畫完成`); }
    });

    const videoPlaylist = [
      'img/PP_1.mp4',
      'img/PP_2.mp4',
      'img/PP_3.mp4',
      'img/PP_2.mp4'
    ];
    // 從HTML加載的PP_1開始，所以索引從0開始
    if(phone){
      // 更新影片索引以在下次點擊時播放正確的影片
      let currentPageU
      switch(toPage){
        case 1:
          currentPageU = 0;
          break;
        case 2:
          currentPageU = 1;
          break;
        case 3:
          currentPageU = 2;
          break;
        case 4:
          currentPageU = 3;
          break;
      }
      
      console.log("currentPage:", currentPageU ,"video: ",videoPlaylist[currentPageU]);
      // 更換影片來源並重新載入
      videoSource.setAttribute('src', videoPlaylist[currentPageU]);
      phoneVideo.load();
      phoneVideo.play();
      
      // 注意：此處未停止事件傳播，因此點擊也會觸發GSAP的頁面切換動畫
    };

    const backgroundVideo = document.getElementById('backgroundVideo');
    if (toPage === 4) {
      backgroundVideo.play();
    } else {
      backgroundVideo.pause();
    }

    const fromConfig = pageConfigs[fromPage];
    const toConfig = pageConfigs[toPage];

    // 控制 final-show 的顯示與隱藏
    if (toPage === 4) {
      finalShow.style.display = 'block';
    } else {
      finalShow.style.display = 'none';
    }

    // 特殊處理：第二頁 -> 第三頁（保留原意）
    if (fromPage === 2 && toPage === 3) {
      const yellowTextTimeline = updateCardContentWithAnimation(yellowCard, toConfig.yellowCard, 0);

      tl
        .to(blueCard, { opacity: 0, scale: 0.8, duration: 0.8, ease: "power2.out" }, 0)
        .to(phone, { x: toConfig.phone.x, y: toConfig.phone.y, scale: toConfig.phone.scale, duration: 1.5, ease: "power3.inOut" }, 0)
        .to(yellowCard, { x: toConfig.yellowCard.x, y: toConfig.yellowCard.y, scale: toConfig.yellowCard.scale, duration: 1.5, ease: "power3.inOut" }, 0)
        .add(yellowTextTimeline, 0);
    }

    // 特殊處理：第三頁 -> 第四頁
    else if (fromPage === 3 && toPage === 4) {
      // 若第四頁的黃卡為 video 且目標 opacity 為 0（使用者要求第四頁黃卡透明），則我們：
      // 1) 淡出舊黃卡 (0 -> ...)
      // 2) 移動/調整大小（set）
      // 3) 在時間點替換為 video 內容，但**不淡入**（保持透明）
      const toYellow = toConfig.yellowCard || {};
      if (toYellow.contentType === 'video' && toYellow.opacity === 0) {
        tl
          // 先淡出並縮小舊黃卡
          .to(yellowCard, { opacity: 0, scale: 0.8, duration: 0.75, ease: "power2.in" }, 0)
          // 手機移動到中心同時執行
          .to(phone, { x: toConfig.phone.x, y: toConfig.phone.y, scale: toConfig.phone.scale, duration: 1.5, ease: "power3.inOut" }, 0)
          // 在中途直接改變位置與尺寸（不改變 opacity）
          .set(yellowCard, { x: toYellow.x, y: toYellow.y, width: toYellow.width, height: toYellow.height }, 0.75)
          // 在 0.75 的時間點替換內容為 video（但保持透明，不淡入）
          .call(() => { replaceCardContent(yellowCard, 'video'); }, null, 0.75)
          // 背景漸變
          .to(productSection, { background: toConfig.background, duration: 1.5, ease: "power2.inOut" }, 0);
      } else {
        // 一般情況（例如第四頁黃卡是要淡入的 video），使用既有流程：淡出 -> set -> 淡入（透過 updateCardContentWithAnimation）
        const yellowTextTimeline = updateCardContentWithAnimation(yellowCard, toYellow, 0.75);

        tl
          .to(yellowCard, { opacity: 0, scale: 0.8, duration: 0.75, ease: "power2.in" }, 0)
          .to(phone, { x: toConfig.phone.x, y: toConfig.phone.y, scale: toConfig.phone.scale, duration: 1.5, ease: "power3.inOut" }, 0)
          .set(yellowCard, { x: toYellow.x, y: toYellow.y, width: toYellow.width, height: toYellow.height }, 0.75)
          .to(yellowCard, { opacity: toYellow.opacity !== undefined ? toYellow.opacity : 1, scale: toYellow.scale || 1, duration: 0.75, ease: "power2.out" }, 0.75)
          .to(productSection, { background: toConfig.background, duration: 1.5, ease: "power2.inOut" }, 0)
          .add(yellowTextTimeline, 0.75);
      }
    }
    if (toPage === 4) {
      const container = document.querySelector('.product-container');

      // 背景漸變動畫
      tl.to(container, {
        background: 'transparent',
        duration: 1.5,
        ease: "power2.inOut"
      }, 0); // 0 表示與其他動畫同時開始
      tl.to(backgroundVideo, { opacity: 1, duration: 1.5, ease: "power2.inOut" }, 0);
    } else if (fromPage === 4 && toPage === 1) {
      // how.style.display='none'; // This line causes an error, so I'm removing it.
      // 回到第一頁時恢復原本背景
      tl.to(container, {
        background: 'linear-gradient(135deg, rgba(52, 152, 219, 1),   /* 藍色 */rgba(84, 187, 255, 1)    /* 深藍，透明度更低 */)',
        duration: 1,
        ease: "power2.inOut"
      }, 0);
      tl.to(backgroundVideo, { opacity: 0, duration: 1, ease: "power2.inOut" }, 0);
    }


    if (fromPage === 4 && toPage === 1) {
      const toConfig = pageConfigs[1]; // 第一頁配置

      // 創建文字動畫
      const yellowTextTimeline = updateCardContentWithAnimation(yellowCard, toConfig.yellowCard, 0);
      const blueTextTimeline = updateCardContentWithAnimation(blueCard, toConfig.blueCard, 0);

      tl
        // 🟡 黃色卡片先縮小並透明，像是從手機後方消失
        .to(yellowCard, {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: "power2.in"
        }, 0)

        // 🔵 藍色卡片先縮小並透明
        .to(blueCard, {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: "power2.in"
        }, 0)

        // 手機回到第一頁位置並稍微放大
        .to(phone, {
          x: toConfig.phone.x,
          y: toConfig.phone.y,
          scale: toConfig.phone.scale,
          rotation: toConfig.phone.rotation,
          duration: 1.5,
          ease: "power3.inOut"
        }, 0)

        // 背景回到第一頁
        .to(productSection, {
          background: toConfig.background,
          duration: 1.5,
          ease: "power2.inOut"
        }, 0)

        // 黃色卡片從手機後方淡入並恢復大小
        .to(yellowCard, {
          x: toConfig.yellowCard.x,
          y: toConfig.yellowCard.y,
          scale: toConfig.yellowCard.scale,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        }, 0.8)

        // 藍色卡片淡入並回到原始位置
        .to(blueCard, {
          x: toConfig.blueCard.x,
          y: toConfig.blueCard.y,
          scale: toConfig.blueCard.scale,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        }, 0.8)

        // 文字動畫延遲添加，確保卡片已到位
        .add(yellowTextTimeline, 1)
        .add(blueTextTimeline, 1);
    }

    // 一般頁面切換動畫
    else {
      if (fromPage === 4) {
        tl.to(container, {
          background: 'linear-gradient(135deg, rgba(52, 152, 219, 1),   /* 藍色 */rgba(84, 187, 255, 1)    /* 深藍，透明度更低 */)',
          duration: 1,
          ease: "power2.inOut"
        }, 0);
        tl.to(backgroundVideo, { opacity: 0, duration: 1, ease: "power2.inOut" }, 0);
      }
      const yellowTextTimeline = updateCardContentWithAnimation(yellowCard, toConfig.yellowCard, 0);
      const blueTextTimeline = updateCardContentWithAnimation(blueCard, toConfig.blueCard, 0);

      tl
        .to(phone, { x: toConfig.phone.x, y: toConfig.phone.y, scale: toConfig.phone.scale, rotation: toConfig.phone.rotation, duration: 1.5, ease: "power3.inOut" }, 0)
        .to(yellowCard, {
          x: toConfig.yellowCard.x, y: toConfig.yellowCard.y,
          scale: toConfig.yellowCard.scale, opacity: toConfig.yellowCard.opacity,
          width: toConfig.yellowCard.width, height: toConfig.yellowCard.height,
          duration: 1.5, ease: "power3.inOut"
        }, 0)
        .to(blueCard, {
          x: toConfig.blueCard.x, y: toConfig.blueCard.y,
          scale: toConfig.blueCard.scale, opacity: toConfig.blueCard.opacity,
          duration: 1.5, ease: "power3.inOut"
        }, 0)
        .to(productSection, { background: toConfig.background, duration: 1.5, ease: "power2.inOut" }, 0)
        .add(yellowTextTimeline, 0)
        .add(blueTextTimeline, 0);
    }

    return tl;

  }

  // ========================================
  // 工具函數
  // ========================================
  function replaceCardContent(cardElement, type) {
    if (!cardElement) return;
    if (type === 'video') {
      cardElement.innerHTML = `         <video class="card-video" autoplay muted loop>           <source src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4">
          您的瀏覽器不支持視頻標籤。         </video>
      `;
    } else {
      cardElement.innerHTML = `         <div class="card-content">           <h3>產品特色</h3>           <p>創新設計，卓越性能，為您帶來前所未有的使用體驗</p>         </div>
      `;
    }
  }

  function updatePageIndicators() {
    dots.forEach((dot, index) => {
      if (index + 1 === currentPage) {
        gsap.to(dot, { scale: 1.3, backgroundColor: '#667eea', duration: 0.3, ease: "power2.out" });
        dot.classList.add('active');
      } else {
        gsap.to(dot, { scale: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)', duration: 0.3, ease: "power2.out" });
        dot.classList.remove('active');
      }
    });
  }

  function transitionToPage(targetPage) {
    console.log("請求page是:" + targetPage);
    if (isAnimating || targetPage === currentPage) return;

    const previousPage = currentPage;
    currentPage = targetPage;

    // 從第四頁回到第一頁
    if (previousPage === 4 && targetPage === 1) {
      resetCardsToInitial();
    }

    createPageTransition(previousPage, currentPage);
    updatePageIndicators();
  }


  // ========================================
  // 事件監聽器設定
  // ========================================
  productSection.addEventListener('click', function (e) {
    if (e.target.closest('.card') || e.target.closest('.page-indicator')) return;
    const nextPage = currentPage === totalPages ? 1 : currentPage + 1;
    console.log(`區域點擊，從第${currentPage}頁切換到第${nextPage}頁`);
    transitionToPage(nextPage);
  });

  dots.forEach(dot => {
    dot.addEventListener('click', function (e) {
      e.stopPropagation();
      const targetPage = parseInt(this.dataset.page);
      if (targetPage !== currentPage) transitionToPage(targetPage);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (!isSectionVisible || isAnimating) return;
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      const nextPage = currentPage === totalPages ? 1 : currentPage + 1;
      transitionToPage(nextPage);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevPage = currentPage === 1 ? totalPages : currentPage - 1;
      transitionToPage(prevPage);
    }
  });

  productSection.addEventListener('mouseenter', function () {
    gsap.to(hint, { opacity: 1, y: -5, duration: 0.5, ease: "power2.out" });
  });

  productSection.addEventListener('mouseleave', function () {
    gsap.to(hint, { opacity: 0, y: 0, duration: 0.5, ease: "power2.out" });
  });

  // ========================================
  // Intersection Observer - 監測區域可見性
  // ========================================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isSectionVisible = true;
        console.log('產品展示區域進入視口');
        
      } else {
        if (isSectionVisible) {
          console.log('產品展示區域離開視口，重置到第一頁');
          
          setTimeout(() => {
            if (currentPage !== 1) {
              console.log('重置到第一頁');
              videoSource.setAttribute('src','img/PP_1.mp4');
              currentPage = 1;
              initializeLayout();
              updatePageIndicators();
              const shown = document.querySelector('.final-show');
              shown.style.display = 'none';
              container.style.background = 'linear-gradient(135deg, rgba(52, 152, 219, 1), rgba(84, 187, 255, 1))';
              const backgroundVideo = document.getElementById('backgroundVideo');
              if (backgroundVideo) {
                backgroundVideo.style.opacity = '0';
                backgroundVideo.pause();
              }
                    phoneVideo.load();
      phoneVideo.play();
            }
          }, 500);
          isSectionVisible = false;
        }
      }
    });
  }, { threshold: 0.1 });

  observer.observe(productSection);

  // ========================================
  // 初始化執行
  // ========================================
  initializeLayout();
  updatePageIndicators();

  // 初始載入動畫（簡單呈現）
  const introTimeline = gsap.timeline();
  introTimeline
    .from(phone, { opacity: 0, scale: 0.8, duration: 1, ease: "power3.out" }, 0)
    .from(yellowCard, { opacity: 0, x: -100, duration: 0.8, ease: "power3.out" }, 0.3)
    .from(blueCard, { opacity: 0, x: 100, duration: 0.8, ease: "power3.out" }, 0.5)
    .from('.page-indicator', { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" }, 0.8)
    .from('.yellow-card h3', { opacity: 0, y: 20, duration: 0.5, ease: "power3.out" }, 0.8)
    .from('.yellow-card p', { opacity: 0, y: -20, duration: 0.5, ease: "power3.out" }, 0.95)
    .from('.blue-card h3', { opacity: 0, y: 20, duration: 0.5, ease: "power3.out" }, 1.1)
    .from('.blue-card p', { opacity: 0, y: -20, duration: 0.5, ease: "power3.out" }, 1.25);

  console.log('GSAP動畫系統初始化完成');


});


// 探探看區塊
// 模擬的JSON數據（10名玩家）
const leaderboardData = [
  { id: 1, name: "玩家A", score: 950 },
  { id: 2, name: "玩家B", score: 880 },
  { id: 3, name: "玩家C", score: 760 },
  { id: 4, name: "玩家D", score: 650 },
  { id: 5, name: "玩家E", score: 520 },
  { id: 6, name: "玩家F", score: 480 },
  { id: 7, name: "玩家G", score: 350 },
  { id: 8, name: "玩家H", score: 220 },
  { id: 9, name: "玩家I", score: 180 },
  { id: 10, name: "玩家J", score: 150 }
];

// 根據分數計算排名
function calculateRanking(data) {
  // 先按分數排序
  const sortedData = [...data].sort((a, b) => b.score - a.score);

  // 分配排名（處理同分情況）
  for (let i = 0; i < sortedData.length; i++) {
    if (i > 0 && sortedData[i].score === sortedData[i - 1].score) {
      sortedData[i].rank = sortedData[i - 1].rank;
    } else {
      sortedData[i].rank = i + 1;
    }
  }

  return sortedData;
}

// 渲染排行榜（顯示全部10名，但容器只顯示3名）
function renderLeaderboard() {
  const leaderboardList = document.getElementById('leaderboardList');
  const rankedData = calculateRanking(leaderboardData);

  leaderboardList.innerHTML = '';

  // 渲染全部10名玩家
  rankedData.forEach(player => {
    const listItem = document.createElement('li');
    listItem.className = 'leaderboard-item';

    const rankElement = document.createElement('span');
    rankElement.className = 'rank';
    rankElement.textContent = `#${player.rank}`;

    const nameElement = document.createElement('span');
    nameElement.className = 'name';
    nameElement.textContent = player.name;

    const scoreElement = document.createElement('span');
    scoreElement.className = 'score';
    scoreElement.textContent = player.score;

    listItem.appendChild(rankElement);
    listItem.appendChild(nameElement);
    listItem.appendChild(scoreElement);

    leaderboardList.appendChild(listItem);
  });
}

// 初始化頁面
document.addEventListener('DOMContentLoaded', function () {
  renderLeaderboard();

  // 換你了按鈕點擊事件
  document.getElementById('changeButton').addEventListener('click', function () {
    // 這裡可以添加換玩家的邏輯
    // 例如：重新獲取數據或刷新排行榜
    renderLeaderboard(); // 重新渲染排行榜

    // 添加按鈕動畫效果
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 100);
  });
});