'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-07 22:07:43
*/

import Backbone from 'backbone';
import _ from 'underscore';
import InterviewModel from 'models/interview_model';
import Config from 'config';
import Utils from 'utils';

class InterviewCollection extends Backbone.Collection {

	constructor() {
		super();

		this.paginate = {
			totalRecords : false,
			page : 0,
			recordsPerPage : Config.recordsPerPage
		}
	}

	get model() { return InterviewModel }

	get url() { return Config['web_service_url']+"interviews" }

	parse(response) {
		this.paginate.totalRecords = response.total_records;
        return response.docs;
	}

	fetch(options) {
		this.trigger('fetching');
		return Backbone.Collection.prototype.fetch.call(this,options);      
    }

	getFirstPage(options={}) {

		var paginateOptions = {
			skip: 0,
			limit: this.paginate.recordsPerPage
		}

		this.fetch({ data : Utils.encodeQueryParameters(_.extend(options,paginateOptions)) });
	}

	getNextPage(options) {

		if (this.paginate.recordsPerPage * this.paginate.page > this.paginate.totalRecords)
			return;

		this.paginate.page ++;

		var paginateOptions = {
			skip: this.paginate.recordsPerPage * this.paginate.page,
			limit: this.paginate.recordsPerPage
		}

		this.fetch({ remove: false, data : Utils.encodeQueryParameters(_.extend(options,paginateOptions)) });
	}

};

export default InterviewCollection