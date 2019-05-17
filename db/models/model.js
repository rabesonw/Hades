var connection = require("../connect");

exports.modelHandler = function (table) {

    var model = {};

    /**
     * builds the where condition for a query from {keys: values}
     * 
     * {key1: value1, key2: value2} becomes
     * where key1 = value1 and key2 = value2
     * @param {*} clause 
     */
    function clauseBuilderQuery(clause) {
        var statement = "";
        var linkWord = "where ";
        if (clause.length == 0) {
            return statement;
        } else {
            for(let key in clause) {
                statement += linkWord + key + " = " + connection.escape(clause[key]);
                linkWord = "and ";
            }
        }
        return statement;
    }

    /**
     * builds the where condition for a search query from {keys: values}
     * 
     * {key1: value1, key2: value2} becomes
     * where key1 like value1 and key2 like value2
     * @param {*} table 
     */
    function clauseBuilderSearch(clause) {
        var statement = "";
        var linkWord = "where ";
        if (clause.length == 0) {
            return statement;
        } else {
            for(let key in clause) {
                statement += linkWord + key + " like " + connection.escape(clause[key]);
                linkWord = "and ";
            }
        }
        return statement;
    }

    /**
     * transforms [ values ] into a comma separated string
     * 
     * [value1, value2] becomes "value1, value2"
     * 
     * @param {*} table 
     */
    function commaSeparator(table) {
        var table = "";
        var separator = "";
        table.forEach(function(item, index, array) {
            table += separator + connection.escape(item);
            separator = ", ";
        });
        return table;
    };

    /**
     * fetches the keys from {keys: values}
     * 
     * {keys: values} becomes [ keys ]
     * 
     * @param {*} couple 
     */
    function getFields(couple) {
        var fields = [];
        for(let field in couple) {
            fields.push(field);
        }
        return fields;
    }

    /**
     * fetches the values from {keys: values}
     * 
     * {keys: values} becomes [ values ]
     * @param {*} couple 
     */
    function getValues(couple) {
        var values = [];
        for(let field in couple) {
            values.push(couple[field]);
        }
        return values;
    }
    
    /**
     * transforms {keys: values} into comma separated keys = values
     * 
     * {key1: value1, key2: value2} becomes "key1 = value1, key2 = value2"
     * 
     * @param {*} values 
     */
    function updateBuilder(values) {
        var statement = "";
        var separator = "";
        for(let field in values) {
            statement += separator + field + " = " +connection.escape(values[field]);
            separator = ", ";
        }
        return statement;
    }

    /**
     * select columns from tables where conditions
     */
    model.readAll = function (fields, clause, next) {
        let sql = "select " + commaSeparator(fields) 
        + " from " + commaSeparator(table) 
        + clauseBuilderQuery(clause) + " ;";
        connection.query(sql, function (error, results, fields) {
            if (error) {
                throw error;
            } else if (next) {
                next(results, error);
            }
        });
    }

    /**
     * select columns from tables where conditions, using like and not =
     */
    .readSearch = function(fields, clause, next) {
        let sql = "select " + commaSeparator(fields) 
        + " from " + commaSeparator(table) 
        + clauseBuilderSearch(clause) + " ;";
        connection.query(sql, function (error, results, fields) {
            if (error) {
                throw error;
            } else if (next) {
                next(results, error);
            }
        });
    }

    /**
     * select column from table where conditions
     */
    .read = function (fields, clause, next) {
        let sql = "select " + commaSeparator(fields) 
        + " from " + commaSeparator(table) 
        + clauseBuilderQuery(clause) + " ;";
        connection.query(sql, function (error, results, fields) {
            if (error) {
                throw error;
            } else if (next) {
                next(results, error);
            }
        });
    }

    /*
        insert into _table_ (field1, field2) values (values1, values2) where condition
    */
    .create = function (values, clause, next) {
        var columns = getFields(values);
        var input = getValues(values)
        let sql = "insert into " + commaSeparator(table) 
        + " ("+ commaSeparator(columns) + ") values (" + commaSeparator(input) + ") " 
        + clauseBuilderQuery(clause) + ";";
        connection.query(sql, function (error, results, fields) {
            if (error) {
                throw error;
            } else if (next) {
                next(results, error);
            }
        });
    }

    /**
     *  update _table_ set colums = values where conditions
     */
    .update = function (values, clause, next) {
        let sql = "update " + commaSeparator(table) 
        + " set " + updateBuilder(values) 
        + clauseBuilderQuery(clause) + ";";
        connection.query(sql, function (error, results, fields) {
            if (error) {
                throw error;
            } else if (next) {
                next(results, error);
            }
        });
    }

    /**
     *  delete from _table_ where conditions
     */
    .delete = function (clause, next) {
        let sql = "delete from " + commaSeparator(table) 
        + clauseBuilderQuery(clause);
        connection.query(sql, function (error, results, fields) {
            if (error) {
                throw error;
            } else if (next) {
                next(results, error);
            }
        })
    };
}