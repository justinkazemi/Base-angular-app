(function (angular) {

  angular.module('BezelDevs.DORM')
    .factory('DORM', ['Entity', 'EntityRepository', 'EntityConfig',
      DORM
    ]);

  function DORM(Entity, EntityRepository, EntityConfig) {

    // Interface of DORM
    return {
      getModelFromEntity: getModelFromEntity,
      entityRepository: entityRepository
    };

    // Public 
    function getModelFromEntity(entity) {
      var model;
      var repository;

      // Ensure a config object is set for this entity type.
      // @todo This *should* be temporary.
      if (typeof EntityConfig[entity.type] === 'undefined') {
        throw new Error('Entity type ['+entity.type+'] not found in config.');
      }

      entity = getModelsFromEntityData(entity);

      model = entityRepository(entity.type).fromEntity(entity);

      return model;
    };

    function entityRepository(type) {
      if (!EntityConfig[type].repositoryInstance) {
        // Check if there is a repository factory
        if (EntityConfig[type].repositoryFactory) {
          EntityConfig[type].repositoryInstance = EntityConfig[type].repositoryFactory(EntityConfig[type]);
        } else {
          var RepositoryConstructor = EntityConfig[type].repository || EntityRepository;

          // If no repository exists, we inject a default with the configured
          // model and data. If no model exists, the EntityRepository
          // constructor handles getting the default for us
          EntityConfig[type].repositoryInstance = new RepositoryConstructor(
            EntityConfig[type].model,
            EntityConfig[type].data
          );
        }
      }
      // Grab the configured repository
      return EntityConfig[type].repositoryInstance;
    };

    // Private
    function getModelsFromEntityData(entity) {
      // Process data for slots and other models
      Object.keys(entity.data).forEach(function(attribute) {
        var data = entity.data[attribute];

        if (data instanceof Array) {
          // Check everything in an array
          entity.data[attribute] = data.map(function(data) {
            if (!(data instanceof Entity) && data instanceof Object && data.hasOwnProperty("uuid")) {
              // Coerce each Entity (assume if it has a uuid, it's an entity)
              data = getModelFromEntity(data);
            }

            return data;
          }, this);
        } else if (data instanceof Object && data.hasOwnProperty("uuid")) {
          // Coerce each Entity (assume if it has a uuid, it's an entity)
          entity.data[attribute] = getModelFromEntity(data);
        }
      }, this);

      return entity;
    };


  }

}(window.angular));