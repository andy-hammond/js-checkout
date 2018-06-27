const Checkout = function(rules) {

    // Store rules against the object, incase required in the future
    this.rules = rules;
    this.total = 0;

    this.scan = function(item){

        const itemRule = this.rules.items[item.id];
        let itemPrice = item.quantity * itemRule.price;
        let revisedBasketTotal = this.total;
        let response = `Item ${item.id} has been added to the basket.`

        // Process any promotions
        if(typeof itemRule.promotions !== 'undefined'){
            itemRule.promotions.map(function(p, x){
                // Check if it's a match!
                if(item.quantity === p.quantity) itemPrice = p.price
            });
        }

        // Update basket total
        this.total += itemPrice

        // Process basket promotions
        this.rules.basketPromotions.map(function(bp, x){
            switch(bp.promotionType){
                case "apply-discount-value-gbp": {
                    this.total -= 20;
                    break;
                }
            }
        });

        response += ` The revised total is ${this.total}.`
        console.log(response);
        
    }

}

module.exports = Checkout;