document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.count');
    const speed = 200; // 숫자 증가 속도, 높을수록 느려짐

    const countUp = (counter) => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;

            // 증가할 수
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                countUp(counter);
                observer.unobserve(counter); // 카운팅 완료 후 관찰 중지
            }
        });
    }, {
        threshold: 1.0 // 요소가 100% 화면에 나타날 때 트리거
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
});
