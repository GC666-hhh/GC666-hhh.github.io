document.addEventListener("DOMContentLoaded", () => {
    const figureContainer = document.querySelector('.figure');
    const figureItems = document.querySelectorAll('.figure div');
    let currentIndex = 0;

    // 监听鼠标进入 figure 区域
    figureContainer.addEventListener('mouseenter', () => {
        figureContainer.addEventListener('wheel', preventDefaultScroll, { passive: false });
    });

    // 监听鼠标离开 figure 区域
    figureContainer.addEventListener('mouseleave', () => {
        figureContainer.removeEventListener('wheel', preventDefaultScroll);
    });

    // 阻止默认滚动行为的函数
    function preventDefaultScroll(event) {
        event.preventDefault();
        // 向下滚动
        if (event.deltaY > 0) {
            if (currentIndex < figureItems.length - 1) {
                currentIndex++;
                scrollToItem(figureItems[currentIndex]);
                zoomInItem(figureItems[currentIndex]);
            }
        } else if (event.deltaY < 0) { // 向上滚动
            if (currentIndex > 0) {
                currentIndex--;
                scrollToItem(figureItems[currentIndex]);
                zoomInItem(figureItems[currentIndex]);
            }
        }
    }

    // 滚动到指定元素的函数
    function scrollToItem(item) {
        const containerWidth = figureContainer.offsetWidth;
        const itemOffset = item.offsetLeft - containerWidth / 2 + item.offsetWidth / 2;
        figureContainer.scrollTo({
            left: itemOffset,
            behavior: 'smooth'
        });
    }

    // 放大指定元素并显示文字的函数
    function zoomInItem(item) {
        figureItems.forEach((el) => {
            el.style.transform = 'scale(0.95)';
            el.style.opacity = 0.7;
            el.style.filter = 'grayscale(30%)';
            el.querySelector('h3').style.opacity = 0;
            el.querySelector('p').style.opacity = 0;
        });

        item.style.transform = 'scale(1.2)';
        item.style.opacity = 1;
        item.style.filter = 'grayscale(0)';
        item.querySelector('h3').style.opacity = 1;
        item.querySelector('p').style.opacity = 1;
    }

    figureItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            figureItems.forEach(el => el.classList.remove('active'));
            item.classList.add('active');

            const containerWidth = figureContainer.offsetWidth;
            const itemOffset = item.offsetLeft - containerWidth / 2 + item.offsetWidth / 2;

            setTimeout(() => {
                figureContainer.scrollTo({
                    left: itemOffset,
                    behavior: 'smooth'
                });
            }, 5);
        });

        item.addEventListener('mouseleave', () => {
            figureItems[1].classList.add('active');
            figureContainer.scrollTo({
                left: figureContainer.scrollWidth / 2 - figureContainer.offsetWidth / 2,
                behavior: 'smooth'
            });
        });
    });

    // 图片轮播功能
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    let currentSlideIndex = 0;
    let autoSlideInterval;

    // 初始化轮播图
    slides.forEach((slide, index) => {
        slide.style.position = 'absolute'; 
        slide.style.transition = 'opacity 1s'; 
        slide.style.opacity = index === 0 ? 1 : 0; 
    });

    // 自动切换到下一张图片
    function nextSlide() {
        slides[currentSlideIndex].style.opacity = 0; 
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        slides[currentSlideIndex].style.opacity = 1; 
    }

    // 开始自动轮播
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3000); 
    }

    // 停止自动轮播
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // 初始化自动轮播
    startAutoSlide();

    // 控制按钮
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    prevBtn.addEventListener('click', () => {
        stopAutoSlide(); 
        slides[currentSlideIndex].style.opacity = 0;
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        slides[currentSlideIndex].style.opacity = 1;
        startAutoSlide(); 
    });

    nextBtn.addEventListener('click', () => {
        stopAutoSlide(); 
        slides[currentSlideIndex].style.opacity = 0;
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        slides[currentSlideIndex].style.opacity = 1;
        startAutoSlide(); 
    });

    // 故事情节弹窗功能
    const storyLink = document.querySelector('a[href="#"]:nth-of-type(1)');
    const modalOverlay = document.getElementById('storyModalOverlay');
    const modalClose = document.querySelector('.modal-close');

    // 显示弹窗
    storyLink.addEventListener('click', (e) => {
    e.preventDefault();
    modalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    });

    // 关闭弹窗
    modalClose.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
    });

    // 点击背景关闭
    modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    });
});

