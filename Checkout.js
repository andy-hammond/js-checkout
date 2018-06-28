const Checkout = function(rules) {

    // Store rules against the object, incase required in the future
    this.rules = rules;

    // Set initial total to Zero
    this.total = 0;

    this.items = [];

    // Set a list of promotions already applied, so we can skip and don't over-discount
    this.appliedPromotions = []

    // Function for applying a promotion
    const applyPromo = function(promotion, currentTotal){
       
        switch(promotion.promotionType){
            case "apply-discount-value-gbp": {
                newTotal = (currentTotal - promotion.promotionValue);
                break;
            }
        }

        return newTotal;
    }

    this.calculateTotal = function(){

        let total = 0;
        
        // Loop through items and sum up the prices
        this.items.map((i, x) => {
            total = total + i.price
        });

        // Process basket promotions
        this.rules.basketPromotions.map(function(bp, x){
            if(bp.ruleType === "is-over" && total > bp.ruleValue) total = applyPromo(bp, total);
        });

        // Update total in memory
        this.total = total;

    }

    // Function for scanning one item at a time
    this.scan = function(item){

        // Just one item? Pass in the id on its own (assuming a letter) and we build the object
        if(typeof item === 'string'){
            item = {
                id: item,
                quantity: 1
            }
        }

        const itemRule = this.rules.items[item.id];
        let itemFromMemory = this.items.find((i) => i.id === item.id);
        let itemIndex = this.items.indexOf(itemFromMemory);
        
        if(typeof itemFromMemory !== 'undefined'){
            item.quantity = itemFromMemory.quantity + item.quantity; // Increase quantity for scanning
            this.items[itemIndex].quantity = item.quantity; // Increase quantity stored in-memory
        } else {
            // Not scanned previously? Add item into memory
            this.items.push(item);
            // Get new item index
            itemIndex = this.items.length - 1;
        }
       
        let itemPrice = item.quantity * itemRule.price;
        let promoPrice = 0, outOfPromoPrice = 0;

        // Process any promotions
        if(typeof itemRule.promotions !== 'undefined'){
            itemRule.promotions.map(function(p, x){
                // Check if it's a match!   
                if(item.quantity >= p.quantity) {
                    promoPrice = p.price * Math.floor(item.quantity/p.quantity)
                    outOfPromoPrice = itemRule.price * (item.quantity - (Math.floor(item.quantity/p.quantity) * p.quantity))
                }
            });
        }

        if(promoPrice > 0) itemPrice = promoPrice + outOfPromoPrice;
       
        this.items[itemIndex].price = itemPrice; // Assign a price for distinct items in memory
        this.calculateTotal(); // Sum up the distinct item totals from memory
        
    }

}

module.exports = Checkout;