const Checkout = function(rules) {

    // Store rules against the object, incase required in the future
    this.rules = rules;

    // Set initial total to Zero
    this.total = 0;

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
        const appliedPromotions = this.appliedPromotions;
        let itemPrice = item.quantity * itemRule.price;
        let revisedTotal = this.total;

        // Process any promotions
        if(typeof itemRule.promotions !== 'undefined'){
            itemRule.promotions.map(function(p, x){
                // Check if it's a match!
                if(item.quantity/p.quantity >= 1) itemPrice = p.price * (item.quantity/p.quantity)
            });
        }

        revisedTotal += itemPrice;
      
        // Process basket promotions
        this.rules.basketPromotions.map(function(bp, x){
           
            if(typeof appliedPromotions.find(promo => promo.id === bp.id) !== 'undefined') return;

            if(bp.ruleType === "is-over" && revisedTotal > bp.ruleValue) {
                
                let totalBeforePromo = revisedTotal;
                revisedTotal = applyPromo(bp, revisedTotal);
                appliedPromotions.push({id: bp.id, before: totalBeforePromo});
                
            }
            
        });

        this.total = revisedTotal;
        this.appliedPromotions = appliedPromotions;

        let response = `Item ${item.id} has been added to the basket.`
        response += ` The revised total is ${this.total}.`

        console.log(response);
        
    }

}

module.exports = Checkout;