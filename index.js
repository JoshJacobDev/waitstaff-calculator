import store from './store.js';

const generateMain = (item) => {
    let mainPage = `
    <article class="group">
        <section class="meal-details item item-double">
            <h2>Enter the Meal Details</h2>
            <form id="meal-details">
                <label for="meal-price">Base Meal Price: $</label>
                <input type="number" id="meal-price" name="meal-details" placeholder="9.99" required>
                <br>
                <label for="tax-rate">Tax Rate: %</label>
                <input type="number" id="tax-rate" name="tax-rate" placeholder="10" required>
                <br>
                <label for="tip-percentage">Tip Percentage: %</label>
                <input type="number" id="tip-percentage" name="tip-percentage" placeholder="20" required>
                <br>
                <button type="submit" class="submit-button">Submit</button>
                <button type="button" class="cancel-button">Cancel</button>
            </form>
        </section>

        <section class="customer-charges">
        </section>
    </article>
    
    <div class="reset">
        <button type="reset" class="reset-button">Reset</button>
    </div>
    `
    $('main').html(mainPage);
};

const render = function () {
    const html = `
        
            <section class="custom-bill item">
                <h2>Customer Charges</h2>
                <h3>Subtotal: $${store.subtotal.toFixed(2)}</h3>
                <h3>Tip: $${store.tipAmount.toFixed(2)}</h3>
                <hr>
                <h3>Total: $${store.total.toFixed(2)}</h3>
            </section>
        
            <section class="earnings item"> 
                <h2>My Earnings Info</h2>
                <h3>Tip Total: $${store.earnings.tipTotal.toFixed(2)}</h3>
                <h3>Meal Count: ${store.earnings.mealCount}</h3>
                <h3>Average Tip Per Meal: $${store.earnings.average.toFixed(2)}</h3>
            </section>
        
    `
    $(".customer-charges").html(html);
};

const customBill = (item) => {
    const subtotal = item.meal + (item.meal * (item.tax / 100));
    const tipAmount = subtotal * (item.tip / 100);
    const total = subtotal + tipAmount;

    store.subtotal = subtotal;
    store.tipAmount = tipAmount;
    store.total = total;
    store.earnings.tipTotal += store.tipAmount;
    store.earnings.mealCount += 1;
    store.earnings.average = (store.earnings.tipTotal / store.earnings.mealCount);
};

const handleSubmit = function () {
    $("#meal-details").on("click", ".submit-button", event => {
        event.preventDefault();
        if ($("#meal-price"))
            console.log("$", $("#meal-price").val());
        console.log($("#tax-rate").val(), "%");
        console.log($("#tip-percentage").val(), "%");
        const meal = parseFloat($('#meal-price').val(), 10);
        const tax = parseFloat($('#tax-rate').val(), 10);
        const tip = parseFloat($('#tip-percentage').val(), 10);
        const obj = {
            meal: meal,
            tax: tax,
            tip: tip
        }
        customBill(obj);
        render();
        $("#meal-details")[0].reset();
    });
};

const handleCancel = function () {
    $("#meal-details").on("click", ".cancel-button", event => {
        console.log("cancel");
        event.preventDefault();
        $("#meal-details")[0].reset();
    });
};

const handleReset = function () {
    $("main").on("click", ".reset", () => {
        console.log("reset");
        store.subtotal = 0;
        store.tipAmount = 0;
        store.total = 0;
        store.earnings.tipTotal = 0;
        store.earnings.mealCount = 0;
        store.earnings.average = 0;
        render();
    });
};

const main = function () {
    generateMain();
    handleSubmit();
    handleCancel();
    handleReset();
    render();
}

$(main);