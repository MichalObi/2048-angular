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

  describe('GridService', function() {

    var gridService, tileModel;

    // inject gridService and tileModel (object) to make some sweet test

    beforeEach(inject(function(GridService, TileModel) {
      gridService = GridService;
      tileModel = TileModel;
    }));

    describe('.buildEmptyGameBoard', function() {
      var nullArr;
      
      beforeEach(function() {
        nullArr = [];
        for (var x = 0; x < 16; x++) {
          nullArr.push(null);
        }
      });

      it('should clear out the grid array with nulls', function() {
        var grid = [];
        for (var x = 0; x < 16; x++) {
          grid.push(x);
        }
        gridService.grid = grid;
        gridService.buildEmptyGameBoard();
        expect(gridService.grid).toEqual(nullArr);
      });
    
    //   it('should clear out the tiles array with nulls', function() {
    //     var tiles = [];
    //     for (var x = 0; x < 16; x++) {
    //       tiles.push(x);
    //     }
    //     gridService.tiles = tiles;
    //     gridService.buildEmptyGameBoard();
    //     expect(gridService.tiles).toEqual(nullArr);
    //   });
    });

  });
});
