/*
 * Copyright 2007-2017 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
 * This file is part of Pydio.
 *
 * Pydio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */

'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var OAuthRouterWrapper = function OAuthRouterWrapper(pydio) {
    var OAuthRouter = function OAuthRouter(props) {
        PydioApi.getRestClient().getOrUpdateJwt().then(function (jwt) {
            if (!jwt) {
                pydio.getController().fireAction('login');
                return;
            }

            var xhr = new XMLHttpRequest();
            xhr.open("POST", '/oauth2/auth' + window.location.search + '&access_token=' + jwt, true);

            //Send the proper header information along with the request
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            xhr.onreadystatechange = function () {
                // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    window.location.href = this.responseURL;
                }
            };

            xhr.send("scopes=openid&scopes=profile&scopes=email&scopes=offline_access");
        });

        return React.createElement(
            'div',
            null,
            props.children
        );
    };

    return OAuthRouter;
};

exports['default'] = OAuthRouterWrapper;
module.exports = exports['default'];
