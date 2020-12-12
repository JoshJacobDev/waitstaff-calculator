import store from './store.js';

const generateMain = function(item){
    
    let mainPage = `
    <section>
    <div class="left-container">
    <h2>Enter the Meal Detail</h2>
    <form id="meal-detail">
    <label for="meal-price">Base Meal Price : $ </label>
    <input type="number" id="meal-price" name="meal-detail" placeholder="9.99" required>
    <br>
    <label for="tax-rate">Tax Rate : % </label>
    <input type="number" id="tax-rate" name="tax-rate" placeholder="9.99" required>
    <br>                
    <label for="tip-percentage">Tip Percentage : % </label>
    <input type="number" id="tip-percentage" name="tip-percentage" placeholder="9.99" required>
    <br>
    <button class="submit-button" type="submit">Submit</button>
    <button class="cancel-button">Cancel</button>
    </form>
     </div>
</section>
<section class="right-container">
</section>
   `
    $('main').html(mainPage);
}

const render = function(){
    const html = `
    <div class="right-container-top">
    <h2>Custom Charge</h2>
    <h4>Subtotal : ${store.subtotal.toFixed(2)}</h4>
    <h4>Tip : ${store.tipPrice.toFixed(2)}</h4>
    <h4>Total : ${store.total.toFixed(2)}</h4>
    </div>
    <div class="right-container-bottom">
    <h2>My Earning Info</h2>
    <h4>Tip Total : ${store.earning.tipTotal.toFixed(2)}</h4>
    <h4>Meal count : ${store.earning.mealCount}</h4>
    <h4>Average Tip Per Meal : ${store.earning.average.toFixed(2)}</h4>
    <button class="reset">Reset</button>
    </div>`
    $('.right-container').html(html);
}

const customCharge = function(item){
    const subtotal = item.meal + (item.meal*(item.tax/100));
    const tipPrice = subtotal*(item.tip/100);
    const total = subtotal + tipPrice ; 

    store.subtotal = subtotal;
    store.tipPrice = tipPrice;
    store.total = total;
    store.earning.tipTotal += store.tipPrice ;
    store.earning.mealCount += 1;
    store.earning.average = (store.earning.tipTotal/store.earning.mealCount);


}


const submitClick = function(){
    $('#meal-detail').on('click', '.submit-button',e=>{
        console.log('submit');
        e.preventDefault();
        const meal = parseFloat($('#meal-price').val(), 10);
        const tax = parseFloat($('#tax-rate').val(), 10);
        const tip = parseFloat($('#tip-percentage').val(), 10);
        const obj = {
            meal: meal,
            tax: tax,
            tip : tip
        }
        customCharge(obj);
        render();
    $('#meal-detail')[0].reset();
        })
}


const cancelClick = function(){
    $('#meal-detail').on('click', '.cancel-button' , e =>{
        console.log('cancel');
        e.preventDefault();
        $('#meal-detail')[0].reset();
    })
}

const resetClick = function(){
    $('main').on('click', '.reset',() =>{
        console.log('reset');
        store.subtotal = 0;
        store.tipPrice = 0;
        store.total = 0 ;
        store.earning.tipTotal = 0;
        store.earning.mealCount = 0;
        store.earning.average = 0;
        render();
    })
}

const main = function(){
    generateMain();
    submitClick();
    cancelClick();
    resetClick();
    render();
}

$(main);