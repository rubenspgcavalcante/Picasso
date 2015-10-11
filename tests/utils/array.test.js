describe("Array utils module", function () {
    var arrayUtils = Picasso.load('utils.array');

    it('should find a object element into the array', function () {
        var arr = [{id: 1}, {id: 2}, {id: 'foo'}, {id: -1}];
        expect(arrayUtils.find(arr, {id: 'foo'})).toBe(true);
    });

    it('should find a primitive element into the array', function () {
        var arr = [1, 2, 'foo', -1];
        expect(arrayUtils.find(arr, 'foo')).toBe(true);
    });

    it('should compare two arrays and find if they\'re equals', function () {
        var arr1 = [1, 2, 'foo', -1];
        var arr2 = [-1, 'foo', 1, 2];
        var arr3 = [1, 2, 3, 4];

        expect(arrayUtils.equals(arr1, arr2)).toBe(true);
        expect(arrayUtils.equals(arr1, arr3)).toBe(false);
    });

    it('should iterates over each element', function () {
        var arr = [1, 2, 3, 4, 5];
        arrayUtils.each(arr, function (val, idx) {
            expect(arr[idx]).toBe(val);
        });
    });
});