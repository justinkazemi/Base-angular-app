(function (angular) {

  angular.module('BezelDevs.Entity')
    .factory('EntityRepository', ['Entity',
      EntityRepositoryFactory
    ]);

  function EntityRepositoryFactory(Entity) {

    function EntityRepository(entityConstructor, defaultData) {
      this.defaultData = defaultData || {};
      this.entityConstructor = entityConstructor || Entity;
    }

    EntityRepository.prototype.instance = function (entity) {
      return new this.entityConstructor(JSON.parse(JSON.stringify(this.defaultData)), entity);
    };

    //@todo Filter by and apply defaults from Entity config
    EntityRepository.prototype.fromEntity = function (entity) {
      var model;

      model = this.instance(entity);

      return model;
    };

    //@todo Filter by and apply defaults from Entity config
    EntityRepository.prototype.toEntity = function (model) {
      var entity = {};

      Object.keys(model).forEach(function (attribute) {
        entity[attribute] = model[attribute];
      });

      return entity;
    };

    return EntityRepository;


  }

}(window.angular));