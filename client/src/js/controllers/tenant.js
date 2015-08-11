/**
 * Created by saiful.
 */
app.controller('TenantIndexCtrl', ['$scope', 'Tenant', '$modal', 'toaster',
  function($scope, Tenant, $modal, toaster) {

    //  pagination
    $scope.itemsByPage=10;

    // index
    Tenant.find({
      filter: {
        where: {
          statusCode: {
            neq: 'Deleted'
          }
        }
      }
    },
    function (res) {
      $scope.tenants = res;
      $scope.displayTenants = [].concat($scope.tenants);
    });

    // remove
    $scope.remove = function (row) {
      var modalInstance = $modal.open({
        templateUrl: 'tpl/tenant/modal.delete.html',
        controller: 'TenantModalInstanceCtrl',
        size: 'lg',
        resolve: {
          item: function () {
            return row;
          }
        }
      });
      modalInstance.result.then(function () {
        Tenant.update(
          {where: { id: row.id }},
          {statusCode: 'Deleted'},
          function () {
            var index = $scope.tenants.indexOf(row);
            if (index !== -1) {
              $scope.tenants.splice(index, 1);
              toaster.pop('success', '', 'Tenant deleted successfully');
            }
          },
          function (error) {
            toaster.pop('error', '', 'Failed to delete tenant!');
          }
        );
      });
    };

  }]);

app.controller('TenantNewCtrl', ['$scope', 'Tenant', 'TenantType', 'IdentityType', 'Status', '$state', 'toaster',
  function ($scope, Tenant, TenantType, IdentityType, Status, $state, toaster) {

    // init
    $scope.tenant = new Tenant();

    // default values
    $scope.tenant.isOwner = true;
    $scope.tenant.created = new Date();
    $scope.tenant.isActive = true;

    // get all tenant where isOwner = true
    // TODO: add to database table
    Tenant.find({
      filter: {
        where: {
          and: [
            { or: [ { parentId: null }, { parentId: '' } ] },
            { isOwner: true }
          ]
        }
      }
    }, function (res) {
      $scope.parentTenantOptions = res;
    //}, function (err) {
    //  console.log(err);
    });

    TenantType.find(function (res) {
      $scope.tenantTypeOptions = res;
    });

    IdentityType.find(function (res) {
      $scope.identityTypeOptions = res;
    });

    $scope.addTenant = function () {

      if ($scope.tenant.isActive)
        $scope.tenant.statusCode = 'Active';
      else
        $scope.tenant.statusCode = 'NotActive';

      Tenant.create(
        {},
        $scope.tenant,
        function () {
          toaster.pop('success', '', 'Tenant added successfully');
          $state.go('app.tenant.list');
        },
        function (error) {
          toaster.pop('error', '', 'Failed to add a tenant!');
        }
      );

    };

  }]);

app.controller('TenantEditCtrl', ['$scope', 'Tenant', 'TenantType', 'IdentityType', 'Status',
  '$state', '$stateParams', 'toaster',
  function ($scope, Tenant, TenantType, IdentityType, Status, $state, $stateParams, toaster) {

    // get current tenant
    Tenant.findById({id: $stateParams.id}, function (res) {
      $scope.tenant = res;
      $scope.tenant.isActive = ($scope.tenant.statusCode === 'Active');
    });

    // get all tenant where isOwner = true
    // TODO: add to database table
    Tenant.find({
      filter: {
        where: {
          and: [
            { or: [ { parentId: null }, { parentId: '' } ] },
            { isOwner: true }
          ]
        }
      }
    }, function (res) {
      $scope.parentTenantOptions = res;
      //}, function (err) {
      //  console.log(err);
    });

    TenantType.find(function (res) {
      $scope.tenantTypeOptions = res;
    });

    IdentityType.find(function (res) {
      $scope.identityTypeOptions = res;
    });

    // update
    $scope.updateTenant = function () {

      $scope.tenant.statusCode = ($scope.tenant.isActive) ? 'Active' : 'NotActive';
      $scope.tenant.updated = new Date();

      if (angular.isUndefined($scope.tenant.parentId))
        $scope.tenant.parentId = null;

      Tenant.update(
        { where: {id: $stateParams.id } },
        $scope.tenant,
        function () {
          toaster.pop('success', '', 'Tenant updated successfully');
          $state.go('app.tenant.list');
        },
        function (error) {
          toaster.pop('error', '', 'Failed to update tenant!');
        }
      );

    };

  }]);

app.controller('TenantDetailCtrl', ['$scope', 'Tenant', 'TenantAddress', 'Status',
  'AddressType','$state', '$stateParams', 'toaster', '$modal',
  function ($scope, Tenant, TenantAddress, Status, AddressType, $state, $stateParams, toaster, $modal)  {

    // get current tenant
    Tenant.findById({
        id: $stateParams.id,
        filter: {
          include: ['addresses', 'parent']
        }
      },
      function (res) {
        $scope.tenant = res;
        $scope.tenant.isActive = ($scope.tenant.statusCode === 'Active');
        $scope.tenant.displayAddresses = [].concat($scope.tenant.addresses);
      }
    );

    //  pagination
    $scope.itemsByPage=10;

    // add address
    $scope.addAddress = function () {
      $scope.item = new TenantAddress();
      AddressType.find(function (res) {
        $scope.item.addressTypeOptions = res;
      });
      $scope.item.created = new Date();
      $scope.item.statusCode = 'Active';
      // TODO: get user
      //$scope.item.createdby = getuser

      var modalInstance = $modal.open({
        templateUrl: 'tpl/tenant/modal.form.address.html',
        controller: 'TenantModalInstanceCtrl',
        size: 'lg',
        resolve: {
          item: function () {
            return $scope.item;
          }
        }
      });
      modalInstance.result.then(function () {

        Tenant.addresses.create(
          {id: $scope.tenant.id},
          $scope.item,
          function (res) {
            $scope.tenant.addresses.push(res);
            toaster.pop('success', '', 'Address added successfully');
            delete $scope.item;
          },
          function () {
            toaster.pop('error', '', 'Failed to add address!');
          }
        );

      });
    };

    // edit address
    $scope.editAddress = function (row) {

      $scope.itemOriginal = row;
      $scope.item = row;

      $scope.item.addressTypeOptions = ['Home', 'Office', 'Other'];

      AddressType.find(function (res) {
        $scope.item.addressTypeOptions = res;
      });

      var modalInstance = $modal.open({
        templateUrl: 'tpl/tenant/modal.form.address.html',
        controller: 'TenantModalInstanceCtrl',
        size: 'lg',
        resolve: {
          item: function () {
            return row;
          }
        }
      });
      modalInstance.result.then(function () {

        TenantAddress.update(
          {where: {id: row.id}},
          $scope.item,
          function () {
            toaster.pop('success', '', 'Address updated successfully');
            delete $scope.item;
            delete $scope.itemOriginal;
          },
          function () {
            row = $scope.itemOriginal;
            toaster.pop('error', '', 'Failed to update address!');
            delete $scope.item;
            delete $scope.itemOriginal;
          }
        );

      });
    };

    // remove address
    $scope.removeAddress = function (row) {
      var modalInstance = $modal.open({
        templateUrl: 'tpl/tenant/modal.delete.address.html',
        controller: 'TenantModalInstanceCtrl',
        size: 'lg',
        resolve: {
          item: function () {
            return row;
          }
        }
      });
      modalInstance.result.then(function () {

        TenantAddress.deleteById(
          {id: row.id},
          function () {
            var index = $scope.tenant.addresses.indexOf(row);
            if (index !== -1) {
              $scope.tenant.addresses.splice(index, 1);
              toaster.pop('success', '', 'Address deleted successfully');
            }
          },
          function () {
            toaster.pop('error', '', 'Failed to deleted address!');
          }
        );

      });
    };
  }]);


app.controller('TenantModalInstanceCtrl', ['$scope', '$modalInstance', 'item',
  function($scope, $modalInstance, item) {
    $scope.item = item;

    $scope.ok = function () {
      $modalInstance.close($scope.id);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }]);

