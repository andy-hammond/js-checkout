
const Rules = {
    items: {
        A: {
            id: 'A',
            price: 30,
            promotions: [
                {
                    quantity: 3,
                    price: 75
                }
            ]
        },
        B: {
            id: 'B',
            price: 20,
            promotions: [
                {
                    quantity: 2,
                    price: 35
                }
            ]
        },
        C: {
            id: 'C',
            price: 50
        },
        D: {
            id: 'D',
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