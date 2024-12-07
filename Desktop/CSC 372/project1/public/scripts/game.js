document.addEventListener('DOMContentLoaded', async () => {
    const gameContainer = document.getElementById('game-container');

    try {
        const response = await fetch('/api/games');
        if (!response.ok) {
            throw new Error('Failed to fetch games');
        }

        const games = await response.json();

        gameContainer.innerHTML = games
            .map(
                (game) => `
            <div class="game-card">
                <img src="${game.cover?.url.replace('t_thumb', 't_cover_big')}" alt="${game.name}" />
                <h3>${game.name}</h3>
                <p>Rating: ${game.rating ? game.rating.toFixed(1) : 'N/A'}</p>
                <p>${game.summary || 'No summary available.'}</p>
            </div>`
            )
            .join('');
    } catch (error) {
        console.error('Error fetching games:', error.message);
        gameContainer.innerHTML = '<p>Failed to load games. Please try again later.</p>';
    }
});
