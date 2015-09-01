function ClientController(
	$scope, $log, $q, $timeout, $mdDialog, $window, $document,
	LocalCache, DocumentsApi, ProfilesApi, FieldsApi) {

	// My services
	this.cache = LocalCache
	this.documentsApi = DocumentsApi;
	this.profilesApi = ProfilesApi;
	this.fieldsApi = FieldsApi;

	// Angular services
	this.$scope = $scope;
	this.$log = $log;
	this.$q = $q;
	this.$timeout = $timeout;
	this.$mdDialog = $mdDialog;
	this.$window = $window;
	this.$document = $document;

	// Profile list
	this.profiles = [];
	this.fields = [];

	// Profile filter
	this.selectedProfile = null;
	this.selectedProfiles = [ ];
    this.profileSearchText = null;

	// Research field filter
	this.selectedField = null;
	this.selectedFields = [ ];
	this.fieldSearchText = null;

	// Trigger initial load of fields and profiles
	this.loadingData = false;
	// Use variable to set if data is ready
	this.ready = true;

	// End initialization with promises
	var self = this;
	this.loadSlimProfilesAsync()
		.then(function(data) { return self.loadFieldsAsync(); })
		.then(function(data) { self.ready = true; })
		.catch(function() { /* Catch error */ })
		.finally(function() { self.$timeout(function(){ self.loadingData = false; }, 1100); })
}

ClientController.prototype.loadSlimProfilesAsync = function() {
	if(this.cache.hasSlimProfiles()) {
		this.profiles = this.cache.getSlimProfiles();
		return this.$q.resolve();
	} else {
		this.loadingData = true;
		var self = this;
		return this.profilesApi.getSlimProfilesAsync()
			.then(function(data) {
				self.cache.setSlimProfiles(data);
				self.profiles = data;
				self.$log.info("Successfully fetched " + data.length + " profiles");
			});
	}
}

ClientController.prototype.loadFieldsAsync = function() {
	if(this.cache.hasFields()) {
		this.fields = this.cache.getFields()
		return this.$q.resolve();
	} else {
		this.loadingData = true;
		var self = this;
		return this.fieldsApi.getFieldsAsync()
			.then(function(data) {
				self.cache.setFields(data);
				self.fields = data;
				self.$log.info("Successfully fetched " + data.length + " fields");
			});
	}
}

ClientController.prototype.queryDocumentsAsync = function() {

}

ClientController.prototype.getProfileMatches = function() {
	return this.getMatches(this.profileSearchText, this.profiles, "name");
}

ClientController.prototype.getFieldMatches = function() {
	return this.getMatches(this.fieldSearchText, this.fields, "title");
}

ClientController.prototype.getMatches = function(searchText, array, attribute) {
	if(!this.ready) {
		return [];
	}

	if (searchText) {
		var lowercaseQuery = angular.lowercase(searchText);
		var filterFn = function filterFn(item) {
			var lowerCaseItem = angular.lowercase(item[attribute]);
			return (lowerCaseItem.indexOf(lowercaseQuery) != -1);;
		};
		return array.filter(filterFn);
	} else {
		return [];
	}
};

ClientController.prototype.saveToFile = function(data, filename) {
        if(!data) {
        	this.$log.error('saveToFile: No data')
        	return;
        }

        if(!filename) filename = 'download.json'

        if(typeof data === "object"){
            data = JSON.stringify(data, undefined, 4)
        }

        var blob = new Blob([data], {type: 'text/json'}),
            e    = this.$document.createEvent('MouseEvents'),
            a    = this.$document.createElement('a')

        a.download = filename
        a.href = this.$window.URL.createObjectURL(blob)
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, this.$window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
}