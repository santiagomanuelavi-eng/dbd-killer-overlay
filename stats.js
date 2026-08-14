function loadMatchStats(){
    return JSON.parse(localStorage.getItem("matchStats")) || {};
}

function computeGlobal(matchStats){

    let wins = 0;
    let losses = 0;
    let draws = 0;

    Object.values(matchStats).forEach(k => {
        wins += k.wins || 0;
        losses += k.losses || 0;
        draws += k.draws || 0;
    });

    const total = wins + losses + draws;
    const winrate = total > 0 ? Math.round((wins / total) * 100) : 0;

    return { wins, losses, draws, total, winrate };
}

function computeMostUsed(matchStats){

    let best = null;
    let bestTotal = -1;

    Object.entries(matchStats).forEach(([name, k]) => {
        const total = (k.wins || 0) + (k.losses || 0) + (k.draws || 0);
        if(total > bestTotal){
            bestTotal = total;
            best = name;
        }
    });

    return best ? { name: best, games: bestTotal } : null;
}

function computeBestWinrate(matchStats){

    let best = null;
    let bestRate = -1;

    Object.entries(matchStats).forEach(([name, k]) => {
        const total = (k.wins || 0) + (k.losses || 0) + (k.draws || 0);
        if(total === 0){
            return;
        }
        const rate = (k.wins || 0) / total;
        if(rate > bestRate){
            bestRate = rate;
            best = name;
        }
    });

    return best ? { name: best, winrate: Math.round(bestRate * 100) } : null;
}

window.renderStats = function(){

    const matchStats = loadMatchStats();
    const global = computeGlobal(matchStats);
    const mostUsed = computeMostUsed(matchStats);
    const bestWinrate = computeBestWinrate(matchStats);

    document.getElementById("statWins").textContent = global.wins;
    document.getElementById("statLosses").textContent = global.losses;
    document.getElementById("statDraws").textContent = global.draws;
    document.getElementById("statWinrate").textContent = global.winrate + "%";

    document.getElementById("statMostUsed").textContent = mostUsed
        ? `${mostUsed.name} (${mostUsed.games} partidas)`
        : "Sin datos aún";

    document.getElementById("statBestWinrate").textContent = bestWinrate
        ? `${bestWinrate.name} (${bestWinrate.winrate}%)`
        : "Sin datos aún";
}
