    function scrollToCard(cardNumber) {
        const scrollContainer = document.getElementById('scrollContainer');
        const card = document.getElementById('card' + cardNumber);
        const cardOffset = card.offsetLeft;
        const cardWidth = card.offsetWidth;
        const containerWidth = scrollContainer.offsetWidth;

        const scrollPosition = cardOffset - (containerWidth / 2) + (cardWidth / 2);

        scrollContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }

    function centerOnScroll() {
        const scrollContainer = document.getElementById('scrollContainer');
        const containerWidth = scrollContainer.offsetWidth;

        const cards = document.querySelectorAll('[id^="card"]');
        
        let closestCard = null;
        let closestOffset = Infinity;

        cards.forEach(card => {
            const cardOffset = card.offsetLeft;
            const cardWidth = card.offsetWidth;
            const distanceFromCenter = Math.abs(cardOffset + cardWidth / 2 - scrollContainer.scrollLeft - containerWidth / 2);
            
            if (distanceFromCenter < closestOffset) {
                closestOffset = distanceFromCenter;
                closestCard = card;
            }
        });
        
        const cardOffset = closestCard.offsetLeft;
        const cardWidth = closestCard.offsetWidth;

        const scrollPosition = cardOffset - (containerWidth / 2) + (cardWidth / 2);
        
        scrollContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }

    // Centrar la primera tarjeta al cargar la página
    window.onload = function() {
        scrollToCard(1);
    };
