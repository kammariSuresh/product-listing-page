document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('productContainer');
    const searchInput = document.getElementById('searchInput');
    const gridButton = document.getElementById('gridButton');
    const listButton = document.getElementById('listButton');
    let data;
  
    const fetchData = async () => {
      try {
        const response = await fetch('https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093');
        data = await response.json();
        // console.log(data)
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
        return [];
      }
    };
  
    const renderProducts = (products) => {
      productContainer.innerHTML = '';
        console.log(products)
      products.data.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.id = `product${product.id}`;

        const variantsList = product.product_variants.map((variantObject) => {
            const variantItems = Object.entries(variantObject)
              .map(([key, value]) => `<li >${value}</li>`)
              .join('');
            return `<ul>${variantItems}</ul>`;
          }).join('');

        productCard.innerHTML = `
          <img src="${product.product_image}" alt="${product.product_title}">
          <h3>${product.product_title}</h3>
          <p>${product.product_badge}</p>
          <ul>${variantsList} </ul>
        `;
        productContainer.appendChild(productCard);
      });
    };
  
    fetchData().then((fetchedData) => {
      renderProducts(fetchedData);
    });
  
    searchInput.addEventListener('input', () => {
        const searchKey = searchInput.value.toLowerCase();
    
        const allProductCards = document.querySelectorAll('.product-card li'); // Adjust based on your actual HTML structure
        allProductCards.forEach((variantElement) => {
          const variantText = variantElement.textContent.toLowerCase();
    
          if (variantText.includes(searchKey)) {
            variantElement.innerHTML = variantText.replace(
              new RegExp(searchKey, 'gi'),
              (match) => `<span class="highlight">${match}</span>`
            );
          } else {
            variantElement.innerHTML = variantText;
          }
        });
      });
  
    gridButton.addEventListener('click', () => {
      productContainer.classList.remove('list-view');
      productContainer.classList.add('grid-view');
    });
  
    listButton.addEventListener('click', () => {
      productContainer.classList.remove('grid-view');
      productContainer.classList.add('list-view');
    });
  });
  