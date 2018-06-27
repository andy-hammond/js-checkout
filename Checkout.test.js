const Checkout = require('./Checkout.js');
const Rules = require('./data/Rules');

// List of test baskets
const testBaskets = [
    {
        description: "testing basket (A, B, C)",
        items: [
            {id: "A", quantity: 1}, {id: "B", quantity: 1}, {id: "C", quantity: 1}
        ],
        result: 100
    },
    {
        description: "testing basket #2 (B, A, B, A, A)",
        items: [
            {id: "A", quantity: 3}, {id: "B", quantity: 2}
        ],
        result: 110
    },
    {
        description: "testing basket #3 (C, B, A, A, D, A, B)",
        items: [
            {id: "A", quantity: 3}, {id: "B", quantity: 2}, {id: "C", quantity: 1}, {id: "D", quantity: 1}
        ],
        result: 155
    },
    
]

// Function to loop through basket and scan items
const scanItems = (co, items) => {
    items.map(function(i, x){
        co.scan(i);
    });
    return co;
}

// Test all test baskets using Jest
testBaskets.map((b, x) => {
    test(b.description, () => {
        let co = new Checkout(Rules);
        scanItems(co, b.items);
        expect(co.total).toBe(b.result)
    });
})