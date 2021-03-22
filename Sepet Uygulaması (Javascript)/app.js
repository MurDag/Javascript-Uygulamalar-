// Storage Controller
const StorageController = (function () {


    return {
        addProduct : function (product){

            let products;

            if(localStorage.getItem('products')===null){
                products = [];
                products.push(product);
            }
            else
            {
                products = JSON.parse(localStorage.getItem('products'));
                products.push(product);
            }

        localStorage.setItem('products',JSON.stringify(products)); 

        },
        getProducts : function (){
            if(localStorage.getItem('products')===null){
                products = [];
            }else {
                products = JSON.parse(localStorage.getItem('products'));
            }
            return products;
        },
        updateProduct : function (product){
            let products = JSON.parse(localStorage.getItem('products'));

            products.forEach(function(prd,index){

                if(product.id == prd.id){
                    products.splice(index,1,product); 
                    // Splice metodunun bir özelliğide index numarasından sonra belirlenen sayıda
                    // elemanı silip yerine belirttiğimiz objeyi ekler.
                    // 1.kullanım : splice(indexnumarası,silinecekelemansayısı) 
                    // 2.kullanım : splice(index numarası,silinecek elemans ayısı,silinen yere eklenecekeleman) 

                }
            });
            localStorage.setItem('products',JSON.stringify(products));

        },
        deleteProduct : function(id){
            
            let products = JSON.parse(localStorage.getItem('products'));

            products.forEach(function(prd,index){

                if(id == prd.id){
                    products.splice(index,1); 
                }
            });
            localStorage.setItem('products',JSON.stringify(products));
        }
    }


})();


// Product Controller

const ProductController = (function () {

    // private
    const Product = function (id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    const data = {
        products: StorageController.getProducts(),
        selectedProduct: null,
        totalPrice: 0
    }

    // public 
    return {
        getProducts: function () {
            return data.products;
        },
        getData: function () {
            return data;
        },
        getProductById: function (id) {
            let product = null;

            data.products.forEach(function (prd) {
                if (prd.id == id) {
                    product = prd;
                }
            });

            return product;
        },
        setCurrentProduct: function (product) {

            data.selectedProduct = product;


        },
        getCurrentProduct() {
            return data.selectedProduct;
        },
        addProduct: function (name, price) {
            let id;

            if (data.products.length > 0) {
                id = data.products[data.products.length - 1].id + 1;
            }
            else {
                id = 0;
            }

            const newProduct = new Product(id, name, parseFloat(price));
            data.products.push(newProduct);
            return newProduct;

        },
        deleteProduct : function (product){
            data.products.forEach(function(prd,index){
            
                if(prd.id == product.id){
                    data.products.splice(index,1);
                }

            });
        },
        getTotal: function () {
            let total = 0;

            data.products.forEach(function (item) {
                total += item.price;
            });

            data.totalPrice = total;
            return data.totalPrice;

        },
        updateProduct: function (name, price) {
            let product = null;

            data.products.forEach(function (prd) {
                if (prd.id == data.selectedProduct.id) {
                    prd.name = name;
                    prd.price = parseFloat(price);
                    product = prd;
                }
            });
            return product;
        }
    }

})();

// UI Controller
const UIController = (function () {

    const Selectors = {
        productList: "#item-list",
        productListItems: "#item-list tr",
        addButton: '.addBtn',
        updateButton: '.updateBtn',
        deleteButton: '.deleteBtn',
        cancelButton: '.cancelBtn',
        productName: '#productName',
        productPrice: '#productPrice',
        productCard: '#productCard',
        totalTL: '#total-tl',
        totalDolar: '#total-dolar',
        totalPrice: '#total-price'
    }

    return {
        createProductList: function (products) {
            let html = '';

            products.forEach(prd => {
                html +=
                    `
                <tr>
                        <td>${prd.id}</td>
                        <td>${prd.name}</td>
                        <td>${prd.price} $</td>
                        <td class="text-right">
                         <i class="far fa-edit edit-product"></i>
                        </td>
                    </tr>
                `;
            });

            document.querySelector(Selectors.productList).innerHTML = html;
        },
        getSelectors: function () {
            return Selectors;
        },
        addProduct: function (prd) {
            var item =
                `
            <tr>
                <td>${prd.id}</td>
                <td>${prd.name}</td>
                <td>${prd.price} $</td>
                <td class="text-right">
                  <i class="far fa-edit edit-product"></i>
                </td>
            </tr>
            `;
            document.querySelector(Selectors.productList).innerHTML += item;
            document.querySelector(Selectors.productCard).style.display = 'block';

        },
        updateProduct : function (prd){
            let updatedItem = null ;

            let items = document.querySelectorAll(Selectors.productListItems);
            items.forEach(function(item){
                if(item.classList.contains('bg-warning')){
                    item.children[1].textContent = prd.name;
                    item.children[2].textContent = prd.price+' $';
                    updatedItem = item;
                }
            });

            return updatedItem;
        },
        clearInputs: function () {
            document.querySelector(Selectors.productName).value = '';
            document.querySelector(Selectors.productPrice).value = '';
        },
        hideCard: function () {
            document.querySelector(Selectors.productCard).style.display = 'none';
        },
        showTotal: function (total) {
            document.querySelector(Selectors.totalDolar).textContent = total;
            document.querySelector(Selectors.totalTL).textContent = total * 4.5;
            document.querySelector(Selectors.totalPrice).style.display = 'block';

        },
        addProductToForm: function () {
            const selectedProduct = ProductController.getCurrentProduct();
            document.querySelector(Selectors.productName).value = selectedProduct.name;
            document.querySelector(Selectors.productPrice).value = selectedProduct.price;
        },
        clearWarnings : function (item)
        {
            const items = document.querySelectorAll(Selectors.productListItems);
            items.forEach(function(item){
                if(item.classList.contains('bg-warning'))
                {
                    item.classList.remove('bg-warning');
                }
            })
        },
        addingState: function () {

            UIController.clearWarnings();
            UIController.clearInputs();
            document.querySelector(Selectors.addButton).style.display = 'inline';
            document.querySelector(Selectors.updateButton).style.display = 'none';
            document.querySelector(Selectors.deleteButton).style.display = 'none';
            document.querySelector(Selectors.cancelButton).style.display = 'none';

        },
        editState: function (tr) {

            const parent = tr.parentNode;

            for (let i = 0; i < parent.children.length; i++) {
                parent.children[i].classList.remove('bg-warning');
            }
            tr.classList.add('bg-warning');
            document.querySelector(Selectors.addButton).style.display = 'none';
            document.querySelector(Selectors.updateButton).style.display = 'inline';
            document.querySelector(Selectors.deleteButton).style.display = 'inline';
            document.querySelector(Selectors.cancelButton).style.display = 'inline';
        },
        deleteProduct : function (){
            let items = document.querySelectorAll(Selectors.productListItems);
            items.forEach(function(item){
                if(item.classList.contains('bg-warning'))
                {
                    item.remove();
                }
            });

            
        }
    }
})();


// App Controller
const App = (function (ProductCtrl, UICtrl, StorageCtrl) {

    const UISelectors = UICtrl.getSelectors();

    // Load Event Listeners
    const loadEventListeners = function () {
        // add product event
        document.querySelector(UISelectors.addButton).addEventListener('click', productAddSubmit);

        // edit product click
        document.querySelector(UISelectors.productList).addEventListener('click', productEditClick);

        // edit product submit
        document.querySelector(UISelectors.updateButton).addEventListener('click', editProductSubmit);

        // cancel button click
        document.querySelector(UISelectors.cancelButton).addEventListener('click',cancelUpdate);

        document.querySelector(UISelectors.deleteButton).addEventListener('click',deleteProductSubmit);

    }

    const editProductSubmit = function (e) {

        const productName = document.querySelector(UISelectors.productName).value;
        const productPrice = document.querySelector(UISelectors.productPrice).value;

        if (productName !== '' && productPrice !== '') {

            // update product
            const updatedProduct = ProductCtrl.updateProduct(productName, productPrice);

            // update ui
            let item = UICtrl.updateProduct(updatedProduct);

            // get total
            const total = ProductCtrl.getTotal();

            // show total
            UICtrl.showTotal(total);

            // update Storage
            StorageCtrl.updateProduct(updatedProduct);

            UICtrl.addingState();

            UICtrl.clearWarnings();

        }


        e.preventDefault();
    }


    const productEditClick = function (e) {
        if (e.target.classList.contains('edit-product')) {
            const id = e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.textContent;

            // get selected product
            const product = ProductCtrl.getProductById(id);


            // set current product
            ProductCtrl.setCurrentProduct(product);

            // add product to UI
            UICtrl.addProductToForm();

            UICtrl.editState(e.target.parentNode.parentNode);
        }
    }
    const cancelUpdate = function (e){

        UICtrl.addingState();
        UIController.clearWarnings();
        
        e.preventDefault();
    }


    const productAddSubmit = function (e) {
        const productName = document.querySelector(UISelectors.productName).value;
        const productPrice = document.querySelector(UISelectors.productPrice).value;

        if (productName !== '' && productPrice !== '') {
            // Add Product
            const newProduct = ProductCtrl.addProduct(productName, productPrice);

            // add item to list
            UIController.addProduct(newProduct);

            // add product to LocalStorage
            StorageCtrl.addProduct(newProduct);

            // get total
            const total = ProductCtrl.getTotal();

            // show total
            UICtrl.showTotal(total);

            // clear inputs
            UIController.clearInputs();

        }
        e.preventDefault();
    }

    const deleteProductSubmit = function (e)
    {
        // get selected product
        const selectedProduct = ProductCtrl.getCurrentProduct();

        // delete product
        ProductCtrl.deleteProduct(selectedProduct);

        // delete ui
        UICtrl.deleteProduct();
        
        // get total
        const total = ProductCtrl.getTotal();

        // show total
        UICtrl.showTotal(total);

        // delete from storage
        StorageCtrl.deleteProduct(selectedProduct.id);

        UICtrl.addingState();

        if(total===0)
        {
            UICtrl.hideCard();
        }


        e.preventDefault();
    }

    return {
        init: function () {
            console.log('starting app....');
            UICtrl.addingState();
            const products = ProductController.getProducts();

            if (products.length == 0) {
                UICtrl.hideCard();
            }

            UICtrl.createProductList(products);

            // load event listener
            loadEventListeners();
        }
    }

})(ProductController, UIController, StorageController);

App.init();