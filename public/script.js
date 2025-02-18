async function fetchTokenHolders() {
  try {
    const response = await fetch('/api/holders');
    const data = await response.json();
    renderBubbleMap(data);
  } catch (error) {
    console.error('Error fetching token holders:', error);
  }
}

function renderBubbleMap(data) {
  const addresses = data.map(holder => holder.address);
  const balances = data.map(holder => holder.balance);

  const plotData = [{
    type: 'scattergeo',
    locations: addresses,
    locationmode: 'ISO-3',
    text: addresses,
    marker: {
      size: balances.map(balance => Math.sqrt(balance) / 1000), // Adjust size for better visualization
      color: balances,
      colorscale: 'Viridis',
      colorbar: {
        title: 'Balance',
      },
    },
  }];

  const layout = {
    title: 'Solana Token Holders Bubble Map',
    geo: {
      projection: {
        type: 'natural earth',
      },
    },
  };

  Plotly.newPlot('bubble-map', plotData, layout);
}

// Fetch data and render the map when the page loads
fetchTokenHolders();
