const add = (num1, num2) => num1 + num2;


test('testing add function', () => {
    expect(add(1,3)).toBe(4);
})