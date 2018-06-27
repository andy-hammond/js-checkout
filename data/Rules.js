
const Rules = {
    items: {
        A: {
            price: 30,
            promotions: [
                {
                    quantity: 3,
                    price: 75
                }
            ]
        },
        B: {
            price: 20,
            promotions: [
                {
                    quantity: 2,
                    price: 35
                }
            ]
        },
        C: {
            price: 50
        },
        D: {
            price: 15
        }
    },
    basketPromotions: [
        {   
            id: 1,
            ruleType: 'is-over',
            ruleValue: 150,
            promotionType: 'apply-discount-value-gbp',
            promotionValue: 20
        }
    ]
};

module.exports = Rules;