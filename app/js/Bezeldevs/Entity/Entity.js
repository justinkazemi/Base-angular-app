(function (angular) {

  angular.module('BezelDevs.Entity')
    .factory('Entity', [
      EntityFactory
    ]);

  function EntityFactory() {

    function Entity(defaultData, entity) {
      var data = defaultData;
      this.dirty = {};

      var properties = {};
      var self = this;

      Object.keys(defaultData).forEach(function (attribute) {
        properties[attribute] = {
          'enumerable': true,
          'get': function () {
            return data[attribute];
          },
          'set': function (value) {
            if (data[attribute] != value) {
              data[attribute] = value;
              self.dirty[attribute] = true;
            }
          }
        };
      });

      this.data = Object.create({}, properties);

      // Ensure custom set-up can be done
      this.update(entity);
    }

    Entity.prototype.getDirtyData = function () {
      var dirtyData = {};

      Object.keys(this.dirty).forEach(function (attribute)
      {
        // Confirm boolean true
        if (this.dirty[attribute] === true)
        {
          dirtyData[attribute] = this.data[attribute];
        }
      }, this);

      return dirtyData;
    };

    Entity.prototype.setData = function (data) {
      Object.keys(data).forEach(function (attribute) {
        this.data[attribute] = data[attribute];
      }, this);
    };


    // Used to update the model data with an updated entity
    Entity.prototype.update = function (entity) {
      if (entity) {
        this.setData(entity.data);

        // This assumes the entity is up to date with the back end, so all
        // dirty flags are cleared.
        this.dirty = {};
        this.type = entity.type;
        this.uuid = entity.uuid;
      }
    };
    return Entity;


  }

}(window.angular));