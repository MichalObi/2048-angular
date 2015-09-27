describe('Grid', function() {

  beforeEach(module('Grid'));

  describe('TileModel', function() {
    var tileModel, tile;

    beforeEach(inject(function(TileModel) {
      tileModel = TileModel;
    }));

    beforeEach(function() {
      tile = new tileModel({x: 1, y: 1}, 2);

    it("should save it's own x coord", function() {
      expect(tile.x).toEqual(1);
    });

    it("should save it's own x coordinate", function() {
      expect(tile.y).toEqual(1);
    });
    it("should save it's own value", function() {
      expect(tile.value).toEqual(2);
    });
    it("should be able to retrieve it's own coordinates", function() {
      expect(tile.getPosition()).toEqual({x: 1, y: 1});
    });

    });
  });
});
