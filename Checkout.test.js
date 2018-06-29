const Checkout = require('./Checkout.js');
const Rules = require('./data/Rules');

// List of test baskets
const testBaskets = [
    {
        description: "testing basket (A, B, C)",
        items: [
            {id: "A", quantity: 1}, {id: "B", quantity: 1}, {id: "C", quantity: 1}
        ],
        result: 101
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
    {
        description: "Single value as a string",
        items: 'A',
        result: 30
    }, 
    {
        description: "Doubling up a promotion is allowed - test #1",
        items: [{id: "A", quantity: 6}],
        result: 150
    }, 
    {
        description: "Doubling up a promotion is allowed - test #2",
        items: [{id: "B", quantity: 6}],
        result: 105
    },
    {
        description: "One by one",
        items: [{id: "B", quantity: 1}, {id: "B", quantity: 1}, {id: "B", quantity: 1}],
        result: 55
    },
    {
        description: "Scanned out of order - do I still my promotion on A?",
        items: [{id: "A", quantity: 1}, {id: "B", quantity: 1}, {id: "A", quantity: 1}, {id: "A", quantity: 1}, {id: "B", quantity: 1}],
        result: 110
    }
]

// Function to loop through basket and scan items
const scanItems = (co, items) => {
 
    if(typeof items === 'object'){
        items.map(function(i, x){
            co.scan(i);
        });
    } else if(typeof items === 'string'){
        co.scan(items)
    }
    
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