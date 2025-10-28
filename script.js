document.addEventListener('DOMContentLoaded', function() {
    // 1. Lắng nghe sự kiện Scroll để kích hoạt Animation
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Thêm class 'visible' để kích hoạt animation
                entry.target.classList.add('is-visible'); 
                observer.unobserve(entry.target); // Ngừng theo dõi sau khi đã hiện
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1 // Kích hoạt khi 10% phần tử hiển thị
    });

    // Theo dõi tất cả các phần tử có animation
    const animatedElements = document.querySelectorAll('.animation-fade-in, .animation-slide-in');
    animatedElements.forEach(element => {
        // Thay vì dùng trực tiếp class 'animation-fade-in/slide-in'
        // ta sẽ tạo một class 'is-visible' trong CSS để kiểm soát
        
        // Điều chỉnh class CSS (cần thêm vào style.css):
        // .animation-fade-in.is-visible { animation: fadeIn 0.8s ease-out forwards; }
        // .animation-slide-in.is-visible { animation: slideIn 0.8s ease-out forwards; }
        
        observer.observe(element);
    });

    // 2. Kích hoạt Animation cho Progress Bar
    const skillsCard = document.querySelector('.skills-card');
    const progressBarObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.progress-bar').forEach(bar => {
                    // Force reflow để animation chạy lại (nếu cần)
                    bar.style.width = bar.getAttribute('style').replace('width: ', '').replace(';', ''); 
                });
                progressBarObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Kích hoạt khi 50% card Kỹ năng hiển thị
    });

    if(skillsCard) {
        progressBarObserver.observe(skillsCard);
    }
});