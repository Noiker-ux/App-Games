(function () {
    'use strict';

    const navigationList = [
        {
            "items_group": [
                {
                    "item_name": "Home",
                    "item_link": "#",
                    "item_icon": "<i class='fa fa-home' aria-hidden='true'></i>"
                },
                {
                    "item_name": "Explore",
                    "item_link": "#explore",
                    "item_icon": "<i class='ri-compass-3-line'></i>"
                },
                {
                    "item_name": "Reviews",
                    "item_link": "#review",
                    "item_icon": "<i class='ri-finder-fill'></i>"
                },
                {
                    "item_name": "Wishlist",
                    "item_link": "#wishlist",
                    "item_icon": "<i class='ri-folder-3-fill'></i>"
                },
                {
                    "item_name": "My library",
                    "item_link": "#my-library", 
                    "item_icon": "<i class='ri-gamepad-fill'></i>"
                }
            ]
            
        },
        {
            "title_group": "New Releases",
            "items_group": [
                {
                    "item_name": "Last 30 days",
                    "item_link": "#last-30-days",
                    "item_icon": "<i class='ri-star-fill'></i>"
                },
                {
                    "item_name": "This week",
                    "item_link": "#time--this-week",
                    "item_icon": "<i class='ri-fire-fill'></i>"
                },
                {
                    "item_name": "Next week",
                    "item_link": "#time--next-week",
                    "item_icon": "<i class='ri-arrow-right-circle-fill'></i>"
                }
                // {
                //     "item_name": "Release calendar",
                //     "item_link": "#release-calendar",
                //     "item_icon": "<i class='ri-calendar-todo-fill'></i>"
                // }
            ]
        },
        {
            "title_group": "Top",
            "items_group": [
                {
                    "item_name": "Best of the year",
                    "item_link": "#popular--now-year",
                    "item_icon": "<i class='ri-award-fill'></i>"
                },
                {
                    "item_name": "Popular in 2022",
                    "item_link": "#popular--prev-year",
                    "item_icon": "<i class='ri-bar-chart-fill'></i>"
                },
                {
                    "item_name": "All time top 250",
                    "item_link": "#all-time-top-250",
                    "item_icon": "<i class='fa fa-trophy' aria-hidden='true'></i>"
                }
            ]
        },
        {
            "title_group": "Platforms",
            "items_group": [
                {
                    "item_name": "PC",
                    "item_link": "#platforms--4",
                    "item_icon": "<i class='ri-windows-fill'></i>"
                },
                {
                    "item_name": "PlayStation4",
                    "item_link": "#platforms--18",
                    "item_icon": "<i class='ri-playstation-line'></i>"
                },
                {
                    "item_name": "Xbox One",
                    "item_link": "#platforms--1",
                    "item_icon": "<i class='ri-xbox-fill'></i>"
                }
                ,
                {
                    "item_name": "Nintendo Switch",
                    "item_link": "#platforms--7",
                    "item_icon": "<i class='ri-switch-line'></i>"
                }
                ,
                {
                    "item_name": "IOS",
                    "item_link": "#platforms--3",
                    "item_icon": "<i class='fa fa-apple' aria-hidden='true'></i>"
                }
                ,
                {
                    "item_name": "Android",
                    "item_link": "#platforms--21",
                    "item_icon": "<i class='fa fa-android' aria-hidden='true'></i>"
                }
            ]
        }
     ];

    class AbstractView {
        constructor(){
            this.app = document.getElementById('root');
        }

        settitle(title){
            document.title = title;
        }

        render(){
            return
        }

        destroy(){
            return
        }
    }

    class DIVComponent {
        constructor(){
            this.element = document.createElement('div');
        }

        render(){
            return this.element;
        }

    }

    class Genre extends DIVComponent{
        constructor(game){
            super();
            this.game=game;
        }

        render(){
            this.element.innerHTML=``;
            this.element.classList.add('genres');
            this.game.genres.forEach(element => {
                this.element.innerHTML+=`
                <div class="genre">
                    ${element.name}
                </div>
        `; 
            });

            return this.element;

        }
    }

    class Card extends DIVComponent {
        constructor(game){
            super();
            this.game=game;
        }


        ratingMetacritick(){
            let HelperProcent = Math.round((this.game.rating/5)*100);
            let ratingMeta=[];
            if (HelperProcent<50) {
                ratingMeta.push('badRating');
            }else {
                if (HelperProcent<75)
                    ratingMeta.push('normalRating');
                else 
                    ratingMeta.push('goodRating');
            }
            ratingMeta.push(HelperProcent);
            return ratingMeta;
        }

        render(){
            this.element.innerHTML=``;
            this.element.classList.add('card');
            this.element.setAttribute('data-id',this.game.id);
            let ratingMeta = this.ratingMetacritick();
            this.element.innerHTML=`
            <img src="${this.game.background_image}" alt="Preview image" class="card__img-preview">
            <div class="card__info">
                <div class="card__info-header">
                    <h3 class="card__title">${this.game.name}</h3>
                    <div class="card__rating ${ratingMeta[0]}">${ratingMeta[1]}</div>
                </div>
                <div class="card__body">${new Genre(this.game).render().outerHTML}</div>
            </div>
        `;
            return this.element;
        }
    }

    class Queryies{
        #keyapi='91b914bf86944b2d9729ffa2c47d253f';
        #Now = new Date();
        routefunc = [
            {hash:'', func: this.basicLoad()},
            {hash:'#last-30-days', func: this.last30Load(this.#Now.getFullYear(),String(this.#Now.getMonth()).padStart(2,'0'),'01',this.#Now.getFullYear(),String(this.#Now.getMonth()+1).padStart(2,'0'),'01')},
            {hash: '#platforms', func: this.platformsRequest()},
            {hash: '#games', func: this.genresRequest()},
            {hash: '#popular', func: this.topRequest()},
            {hash: '#all-time-top-250', func: this.top250GamesEver()}
        ]


        constructor(hash){
            this.hash=hash;
        }

        async basicLoad(){
            let dateNow = new Date().getFullYear();
            let responce = await fetch(`https://api.rawg.io/api/games?dates=${dateNow}-01-01,${dateNow}-12-31&ordering=+added&key=${this.#keyapi}`);
            responce = await responce.json();
            responce = [responce.count, responce.results];
            return responce;
        }


        async last30Load(YearNow,MonthNow,DateNow,YearNext,MonthNext,DateNext){
            console.log();
            let responce= await fetch(`https://api.rawg.io/api/games?ordering=metacritic&dates=${YearNow}-${MonthNow}-${DateNow},${YearNext}-${MonthNext}-${DateNext}&key=${this.#keyapi}&ordering=created`);      
            responce = await responce.json();
            responce = [responce.count, responce.results];
            return responce;
        }



        async topRequest(){
            let prefix = this.whatPrefix();
            let responce;
            let nowYear = new Date().getFullYear();
            if (prefix[1]=='now-year'){
                responce = await fetch(`https://api.rawg.io/api/games?dates=${nowYear}-01-01,${nowYear}-12-31&page_size=250&ordering=-added&key=${this.#keyapi}`);
            } else {
                responce = await fetch(`https://api.rawg.io/api/games?dates=${nowYear-1}-01-01,${nowYear-1}-12-31&page_size=250&ordering=-added&key=${this.#keyapi}`);
            }
            responce = await responce.json();
            responce = [responce.count, responce.results];
            return responce;
        }

        // request for 250 top
        async top250GamesEver(){
           let responce = await fetch(`https://api.rawg.io/api/games?page_size=250&ordering=-added&key=${this.#keyapi}`);
           responce = await responce.json();
           responce = [responce.count, responce.results];
           return responce;
        }

        whatPrefix(){
            return location.hash.split('--');
        }
        // requests for platforms
        async platformsRequest(){
            let whatPlatform = this.whatPrefix();
            let responce = await fetch(`https://api.rawg.io/api/games?platforms_count=1&ordering=+released&platforms=${whatPlatform[1]}&key=${this.#keyapi}`);
            responce = await responce.json();
            responce = [responce.count, responce.results];
            return responce;
        }

        //requests for genres 
        async genresRequest(){
            let whatgenre = await this.whatPrefix();
            let responce = await fetch(`https://api.rawg.io/api/games?genres=${whatgenre[1]}&key=${this.#keyapi}`);
            responce = await responce.json();
            responce = [responce.count, responce.results];
            return responce;
        }
    }

    class Main  {

        constructor(hash){
            this.element = document.createElement('main');
            this.hash=hash;
        }
        renderCard(element){
            const card = new Card(element).render();
            this.element.append(card);
        }

        async render(){
            this.element.innerHTML=``;
            this.element.classList.add('main');
            this.element.classList.add('container');
            this.element.setAttribute('id','main');
            // this

            let responce = await new Queryies(this.hash);
            let helper = this.hash.split('--');
            let functionForView = responce.routefunc.find(el=>el.hash==helper[0]);
            responce = await functionForView.func;
            await responce[1].forEach(element => {
                this.renderCard(element);
            });
            return this.element;
        }

    }

    const PATH_SEPARATOR = '.';
    const TARGET = Symbol('target');
    const UNSUBSCRIBE = Symbol('unsubscribe');

    function isBuiltinWithMutableMethods(value) {
    	return value instanceof Date
    		|| value instanceof Set
    		|| value instanceof Map
    		|| value instanceof WeakSet
    		|| value instanceof WeakMap
    		|| ArrayBuffer.isView(value);
    }

    function isBuiltinWithoutMutableMethods(value) {
    	return (typeof value === 'object' ? value === null : typeof value !== 'function') || value instanceof RegExp;
    }

    var isArray = Array.isArray;

    function isSymbol(value) {
    	return typeof value === 'symbol';
    }

    const path = {
    	after: (path, subPath) => {
    		if (isArray(path)) {
    			return path.slice(subPath.length);
    		}

    		if (subPath === '') {
    			return path;
    		}

    		return path.slice(subPath.length + 1);
    	},
    	concat: (path, key) => {
    		if (isArray(path)) {
    			path = [...path];

    			if (key) {
    				path.push(key);
    			}

    			return path;
    		}

    		if (key && key.toString !== undefined) {
    			if (path !== '') {
    				path += PATH_SEPARATOR;
    			}

    			if (isSymbol(key)) {
    				return path + key.toString();
    			}

    			return path + key;
    		}

    		return path;
    	},
    	initial: path => {
    		if (isArray(path)) {
    			return path.slice(0, -1);
    		}

    		if (path === '') {
    			return path;
    		}

    		const index = path.lastIndexOf(PATH_SEPARATOR);

    		if (index === -1) {
    			return '';
    		}

    		return path.slice(0, index);
    	},
    	last: path => {
    		if (isArray(path)) {
    			return path[path.length - 1] || '';
    		}

    		if (path === '') {
    			return path;
    		}

    		const index = path.lastIndexOf(PATH_SEPARATOR);

    		if (index === -1) {
    			return path;
    		}

    		return path.slice(index + 1);
    	},
    	walk: (path, callback) => {
    		if (isArray(path)) {
    			for (const key of path) {
    				callback(key);
    			}
    		} else if (path !== '') {
    			let position = 0;
    			let index = path.indexOf(PATH_SEPARATOR);

    			if (index === -1) {
    				callback(path);
    			} else {
    				while (position < path.length) {
    					if (index === -1) {
    						index = path.length;
    					}

    					callback(path.slice(position, index));

    					position = index + 1;
    					index = path.indexOf(PATH_SEPARATOR, position);
    				}
    			}
    		}
    	},
    	get(object, path) {
    		this.walk(path, key => {
    			if (object) {
    				object = object[key];
    			}
    		});

    		return object;
    	},
    };

    function isIterator(value) {
    	return typeof value === 'object' && typeof value.next === 'function';
    }

    // eslint-disable-next-line max-params
    function wrapIterator(iterator, target, thisArg, applyPath, prepareValue) {
    	const originalNext = iterator.next;

    	if (target.name === 'entries') {
    		iterator.next = function () {
    			const result = originalNext.call(this);

    			if (result.done === false) {
    				result.value[0] = prepareValue(
    					result.value[0],
    					target,
    					result.value[0],
    					applyPath,
    				);
    				result.value[1] = prepareValue(
    					result.value[1],
    					target,
    					result.value[0],
    					applyPath,
    				);
    			}

    			return result;
    		};
    	} else if (target.name === 'values') {
    		const keyIterator = thisArg[TARGET].keys();

    		iterator.next = function () {
    			const result = originalNext.call(this);

    			if (result.done === false) {
    				result.value = prepareValue(
    					result.value,
    					target,
    					keyIterator.next().value,
    					applyPath,
    				);
    			}

    			return result;
    		};
    	} else {
    		iterator.next = function () {
    			const result = originalNext.call(this);

    			if (result.done === false) {
    				result.value = prepareValue(
    					result.value,
    					target,
    					result.value,
    					applyPath,
    				);
    			}

    			return result;
    		};
    	}

    	return iterator;
    }

    function ignoreProperty(cache, options, property) {
    	return cache.isUnsubscribed
    		|| (options.ignoreSymbols && isSymbol(property))
    		|| (options.ignoreUnderscores && property.charAt(0) === '_')
    		|| ('ignoreKeys' in options && options.ignoreKeys.includes(property));
    }

    /**
    @class Cache
    @private
    */
    class Cache {
    	constructor(equals) {
    		this._equals = equals;
    		this._proxyCache = new WeakMap();
    		this._pathCache = new WeakMap();
    		this.isUnsubscribed = false;
    	}

    	_getDescriptorCache() {
    		if (this._descriptorCache === undefined) {
    			this._descriptorCache = new WeakMap();
    		}

    		return this._descriptorCache;
    	}

    	_getProperties(target) {
    		const descriptorCache = this._getDescriptorCache();
    		let properties = descriptorCache.get(target);

    		if (properties === undefined) {
    			properties = {};
    			descriptorCache.set(target, properties);
    		}

    		return properties;
    	}

    	_getOwnPropertyDescriptor(target, property) {
    		if (this.isUnsubscribed) {
    			return Reflect.getOwnPropertyDescriptor(target, property);
    		}

    		const properties = this._getProperties(target);
    		let descriptor = properties[property];

    		if (descriptor === undefined) {
    			descriptor = Reflect.getOwnPropertyDescriptor(target, property);
    			properties[property] = descriptor;
    		}

    		return descriptor;
    	}

    	getProxy(target, path, handler, proxyTarget) {
    		if (this.isUnsubscribed) {
    			return target;
    		}

    		const reflectTarget = target[proxyTarget];
    		const source = reflectTarget || target;

    		this._pathCache.set(source, path);

    		let proxy = this._proxyCache.get(source);

    		if (proxy === undefined) {
    			proxy = reflectTarget === undefined
    				? new Proxy(target, handler)
    				: target;

    			this._proxyCache.set(source, proxy);
    		}

    		return proxy;
    	}

    	getPath(target) {
    		return this.isUnsubscribed ? undefined : this._pathCache.get(target);
    	}

    	isDetached(target, object) {
    		return !Object.is(target, path.get(object, this.getPath(target)));
    	}

    	defineProperty(target, property, descriptor) {
    		if (!Reflect.defineProperty(target, property, descriptor)) {
    			return false;
    		}

    		if (!this.isUnsubscribed) {
    			this._getProperties(target)[property] = descriptor;
    		}

    		return true;
    	}

    	setProperty(target, property, value, receiver, previous) { // eslint-disable-line max-params
    		if (!this._equals(previous, value) || !(property in target)) {
    			const descriptor = this._getOwnPropertyDescriptor(target, property);

    			if (descriptor !== undefined && 'set' in descriptor) {
    				return Reflect.set(target, property, value, receiver);
    			}

    			return Reflect.set(target, property, value);
    		}

    		return true;
    	}

    	deleteProperty(target, property, previous) {
    		if (Reflect.deleteProperty(target, property)) {
    			if (!this.isUnsubscribed) {
    				const properties = this._getDescriptorCache().get(target);

    				if (properties) {
    					delete properties[property];
    					this._pathCache.delete(previous);
    				}
    			}

    			return true;
    		}

    		return false;
    	}

    	isSameDescriptor(a, target, property) {
    		const b = this._getOwnPropertyDescriptor(target, property);

    		return a !== undefined
    			&& b !== undefined
    			&& Object.is(a.value, b.value)
    			&& (a.writable || false) === (b.writable || false)
    			&& (a.enumerable || false) === (b.enumerable || false)
    			&& (a.configurable || false) === (b.configurable || false)
    			&& a.get === b.get
    			&& a.set === b.set;
    	}

    	isGetInvariant(target, property) {
    		const descriptor = this._getOwnPropertyDescriptor(target, property);

    		return descriptor !== undefined
    			&& descriptor.configurable !== true
    			&& descriptor.writable !== true;
    	}

    	unsubscribe() {
    		this._descriptorCache = null;
    		this._pathCache = null;
    		this._proxyCache = null;
    		this.isUnsubscribed = true;
    	}
    }

    function isObject(value) {
    	return toString.call(value) === '[object Object]';
    }

    function isDiffCertain() {
    	return true;
    }

    function isDiffArrays(clone, value) {
    	return clone.length !== value.length || clone.some((item, index) => value[index] !== item);
    }

    const IMMUTABLE_OBJECT_METHODS = new Set([
    	'hasOwnProperty',
    	'isPrototypeOf',
    	'propertyIsEnumerable',
    	'toLocaleString',
    	'toString',
    	'valueOf',
    ]);

    const IMMUTABLE_ARRAY_METHODS = new Set([
    	'concat',
    	'includes',
    	'indexOf',
    	'join',
    	'keys',
    	'lastIndexOf',
    ]);

    const MUTABLE_ARRAY_METHODS = {
    	push: isDiffCertain,
    	pop: isDiffCertain,
    	shift: isDiffCertain,
    	unshift: isDiffCertain,
    	copyWithin: isDiffArrays,
    	reverse: isDiffArrays,
    	sort: isDiffArrays,
    	splice: isDiffArrays,
    	flat: isDiffArrays,
    	fill: isDiffArrays,
    };

    const HANDLED_ARRAY_METHODS = new Set([
    	...IMMUTABLE_OBJECT_METHODS,
    	...IMMUTABLE_ARRAY_METHODS,
    	...Object.keys(MUTABLE_ARRAY_METHODS),
    ]);

    function isDiffSets(clone, value) {
    	if (clone.size !== value.size) {
    		return true;
    	}

    	for (const element of clone) {
    		if (!value.has(element)) {
    			return true;
    		}
    	}

    	return false;
    }

    const COLLECTION_ITERATOR_METHODS = [
    	'keys',
    	'values',
    	'entries',
    ];

    const IMMUTABLE_SET_METHODS = new Set([
    	'has',
    	'toString',
    ]);

    const MUTABLE_SET_METHODS = {
    	add: isDiffSets,
    	clear: isDiffSets,
    	delete: isDiffSets,
    	forEach: isDiffSets,
    };

    const HANDLED_SET_METHODS = new Set([
    	...IMMUTABLE_SET_METHODS,
    	...Object.keys(MUTABLE_SET_METHODS),
    	...COLLECTION_ITERATOR_METHODS,
    ]);

    function isDiffMaps(clone, value) {
    	if (clone.size !== value.size) {
    		return true;
    	}

    	let bValue;
    	for (const [key, aValue] of clone) {
    		bValue = value.get(key);

    		if (bValue !== aValue || (bValue === undefined && !value.has(key))) {
    			return true;
    		}
    	}

    	return false;
    }

    const IMMUTABLE_MAP_METHODS = new Set([...IMMUTABLE_SET_METHODS, 'get']);

    const MUTABLE_MAP_METHODS = {
    	set: isDiffMaps,
    	clear: isDiffMaps,
    	delete: isDiffMaps,
    	forEach: isDiffMaps,
    };

    const HANDLED_MAP_METHODS = new Set([
    	...IMMUTABLE_MAP_METHODS,
    	...Object.keys(MUTABLE_MAP_METHODS),
    	...COLLECTION_ITERATOR_METHODS,
    ]);

    class CloneObject {
    	constructor(value, path, argumentsList, hasOnValidate) {
    		this._path = path;
    		this._isChanged = false;
    		this._clonedCache = new Set();
    		this._hasOnValidate = hasOnValidate;
    		this._changes = hasOnValidate ? [] : null;

    		this.clone = path === undefined ? value : this._shallowClone(value);
    	}

    	static isHandledMethod(name) {
    		return IMMUTABLE_OBJECT_METHODS.has(name);
    	}

    	_shallowClone(value) {
    		let clone = value;

    		if (isObject(value)) {
    			clone = {...value};
    		} else if (isArray(value) || ArrayBuffer.isView(value)) {
    			clone = [...value];
    		} else if (value instanceof Date) {
    			clone = new Date(value);
    		} else if (value instanceof Set) {
    			clone = new Set([...value].map(item => this._shallowClone(item)));
    		} else if (value instanceof Map) {
    			clone = new Map();

    			for (const [key, item] of value.entries()) {
    				clone.set(key, this._shallowClone(item));
    			}
    		}

    		this._clonedCache.add(clone);

    		return clone;
    	}

    	preferredThisArg(isHandledMethod, name, thisArg, thisProxyTarget) {
    		if (isHandledMethod) {
    			if (isArray(thisProxyTarget)) {
    				this._onIsChanged = MUTABLE_ARRAY_METHODS[name];
    			} else if (thisProxyTarget instanceof Set) {
    				this._onIsChanged = MUTABLE_SET_METHODS[name];
    			} else if (thisProxyTarget instanceof Map) {
    				this._onIsChanged = MUTABLE_MAP_METHODS[name];
    			}

    			return thisProxyTarget;
    		}

    		return thisArg;
    	}

    	update(fullPath, property, value) {
    		const changePath = path.after(fullPath, this._path);

    		if (property !== 'length') {
    			let object = this.clone;

    			path.walk(changePath, key => {
    				if (object && object[key]) {
    					if (!this._clonedCache.has(object[key])) {
    						object[key] = this._shallowClone(object[key]);
    					}

    					object = object[key];
    				}
    			});

    			if (this._hasOnValidate) {
    				this._changes.push({
    					path: changePath,
    					property,
    					previous: value,
    				});
    			}

    			if (object && object[property]) {
    				object[property] = value;
    			}
    		}

    		this._isChanged = true;
    	}

    	undo(object) {
    		let change;

    		for (let index = this._changes.length - 1; index !== -1; index--) {
    			change = this._changes[index];

    			path.get(object, change.path)[change.property] = change.previous;
    		}
    	}

    	isChanged(value) {
    		return this._onIsChanged === undefined
    			? this._isChanged
    			: this._onIsChanged(this.clone, value);
    	}
    }

    class CloneArray extends CloneObject {
    	static isHandledMethod(name) {
    		return HANDLED_ARRAY_METHODS.has(name);
    	}
    }

    class CloneDate extends CloneObject {
    	undo(object) {
    		object.setTime(this.clone.getTime());
    	}

    	isChanged(value, equals) {
    		return !equals(this.clone.valueOf(), value.valueOf());
    	}
    }

    class CloneSet extends CloneObject {
    	static isHandledMethod(name) {
    		return HANDLED_SET_METHODS.has(name);
    	}

    	undo(object) {
    		for (const value of this.clone) {
    			object.add(value);
    		}

    		for (const value of object) {
    			if (!this.clone.has(value)) {
    				object.delete(value);
    			}
    		}
    	}
    }

    class CloneMap extends CloneObject {
    	static isHandledMethod(name) {
    		return HANDLED_MAP_METHODS.has(name);
    	}

    	undo(object) {
    		for (const [key, value] of this.clone.entries()) {
    			object.set(key, value);
    		}

    		for (const key of object.keys()) {
    			if (!this.clone.has(key)) {
    				object.delete(key);
    			}
    		}
    	}
    }

    class CloneWeakSet extends CloneObject {
    	constructor(value, path, argumentsList, hasOnValidate) {
    		super(undefined, path, argumentsList, hasOnValidate);

    		this._arg1 = argumentsList[0];
    		this._weakValue = value.has(this._arg1);
    	}

    	isChanged(value) {
    		return this._weakValue !== value.has(this._arg1);
    	}

    	undo(object) {
    		if (this._weakValue && !object.has(this._arg1)) {
    			object.add(this._arg1);
    		} else {
    			object.delete(this._arg1);
    		}
    	}
    }

    class CloneWeakMap extends CloneObject {
    	constructor(value, path, argumentsList, hasOnValidate) {
    		super(undefined, path, argumentsList, hasOnValidate);

    		this._weakKey = argumentsList[0];
    		this._weakHas = value.has(this._weakKey);
    		this._weakValue = value.get(this._weakKey);
    	}

    	isChanged(value) {
    		return this._weakValue !== value.get(this._weakKey);
    	}

    	undo(object) {
    		const weakHas = object.has(this._weakKey);

    		if (this._weakHas && !weakHas) {
    			object.set(this._weakKey, this._weakValue);
    		} else if (!this._weakHas && weakHas) {
    			object.delete(this._weakKey);
    		} else if (this._weakValue !== object.get(this._weakKey)) {
    			object.set(this._weakKey, this._weakValue);
    		}
    	}
    }

    class SmartClone {
    	constructor(hasOnValidate) {
    		this._stack = [];
    		this._hasOnValidate = hasOnValidate;
    	}

    	static isHandledType(value) {
    		return isObject(value)
    			|| isArray(value)
    			|| isBuiltinWithMutableMethods(value);
    	}

    	static isHandledMethod(target, name) {
    		if (isObject(target)) {
    			return CloneObject.isHandledMethod(name);
    		}

    		if (isArray(target)) {
    			return CloneArray.isHandledMethod(name);
    		}

    		if (target instanceof Set) {
    			return CloneSet.isHandledMethod(name);
    		}

    		if (target instanceof Map) {
    			return CloneMap.isHandledMethod(name);
    		}

    		return isBuiltinWithMutableMethods(target);
    	}

    	get isCloning() {
    		return this._stack.length > 0;
    	}

    	start(value, path, argumentsList) {
    		let CloneClass = CloneObject;

    		if (isArray(value)) {
    			CloneClass = CloneArray;
    		} else if (value instanceof Date) {
    			CloneClass = CloneDate;
    		} else if (value instanceof Set) {
    			CloneClass = CloneSet;
    		} else if (value instanceof Map) {
    			CloneClass = CloneMap;
    		} else if (value instanceof WeakSet) {
    			CloneClass = CloneWeakSet;
    		} else if (value instanceof WeakMap) {
    			CloneClass = CloneWeakMap;
    		}

    		this._stack.push(new CloneClass(value, path, argumentsList, this._hasOnValidate));
    	}

    	update(fullPath, property, value) {
    		this._stack[this._stack.length - 1].update(fullPath, property, value);
    	}

    	preferredThisArg(target, thisArg, thisProxyTarget) {
    		const {name} = target;
    		const isHandledMethod = SmartClone.isHandledMethod(thisProxyTarget, name);

    		return this._stack[this._stack.length - 1]
    			.preferredThisArg(isHandledMethod, name, thisArg, thisProxyTarget);
    	}

    	isChanged(isMutable, value, equals) {
    		return this._stack[this._stack.length - 1].isChanged(isMutable, value, equals);
    	}

    	undo(object) {
    		if (this._previousClone !== undefined) {
    			this._previousClone.undo(object);
    		}
    	}

    	stop() {
    		this._previousClone = this._stack.pop();

    		return this._previousClone.clone;
    	}
    }

    /* eslint-disable unicorn/prefer-spread */

    const defaultOptions = {
    	equals: Object.is,
    	isShallow: false,
    	pathAsArray: false,
    	ignoreSymbols: false,
    	ignoreUnderscores: false,
    	ignoreDetached: false,
    	details: false,
    };

    const onChange = (object, onChange, options = {}) => {
    	options = {
    		...defaultOptions,
    		...options,
    	};

    	const proxyTarget = Symbol('ProxyTarget');
    	const {equals, isShallow, ignoreDetached, details} = options;
    	const cache = new Cache(equals);
    	const hasOnValidate = typeof options.onValidate === 'function';
    	const smartClone = new SmartClone(hasOnValidate);

    	// eslint-disable-next-line max-params
    	const validate = (target, property, value, previous, applyData) => !hasOnValidate
    		|| smartClone.isCloning
    		|| options.onValidate(path.concat(cache.getPath(target), property), value, previous, applyData) === true;

    	const handleChangeOnTarget = (target, property, value, previous) => {
    		if (
    			!ignoreProperty(cache, options, property)
    			&& !(ignoreDetached && cache.isDetached(target, object))
    		) {
    			handleChange(cache.getPath(target), property, value, previous);
    		}
    	};

    	// eslint-disable-next-line max-params
    	const handleChange = (changePath, property, value, previous, applyData) => {
    		if (smartClone.isCloning) {
    			smartClone.update(changePath, property, previous);
    		} else {
    			onChange(path.concat(changePath, property), value, previous, applyData);
    		}
    	};

    	const getProxyTarget = value => value
    		? (value[proxyTarget] || value)
    		: value;

    	const prepareValue = (value, target, property, basePath) => {
    		if (
    			isBuiltinWithoutMutableMethods(value)
    			|| property === 'constructor'
    			|| (isShallow && !SmartClone.isHandledMethod(target, property))
    			|| ignoreProperty(cache, options, property)
    			|| cache.isGetInvariant(target, property)
    			|| (ignoreDetached && cache.isDetached(target, object))
    		) {
    			return value;
    		}

    		if (basePath === undefined) {
    			basePath = cache.getPath(target);
    		}

    		return cache.getProxy(value, path.concat(basePath, property), handler, proxyTarget);
    	};

    	const handler = {
    		get(target, property, receiver) {
    			if (isSymbol(property)) {
    				if (property === proxyTarget || property === TARGET) {
    					return target;
    				}

    				if (
    					property === UNSUBSCRIBE
    					&& !cache.isUnsubscribed
    					&& cache.getPath(target).length === 0
    				) {
    					cache.unsubscribe();
    					return target;
    				}
    			}

    			const value = isBuiltinWithMutableMethods(target)
    				? Reflect.get(target, property)
    				: Reflect.get(target, property, receiver);

    			return prepareValue(value, target, property);
    		},

    		set(target, property, value, receiver) {
    			value = getProxyTarget(value);

    			const reflectTarget = target[proxyTarget] || target;
    			const previous = reflectTarget[property];

    			if (equals(previous, value) && property in target) {
    				return true;
    			}

    			const isValid = validate(target, property, value, previous);

    			if (
    				isValid
    				&& cache.setProperty(reflectTarget, property, value, receiver, previous)
    			) {
    				handleChangeOnTarget(target, property, target[property], previous);

    				return true;
    			}

    			return !isValid;
    		},

    		defineProperty(target, property, descriptor) {
    			if (!cache.isSameDescriptor(descriptor, target, property)) {
    				const previous = target[property];

    				if (
    					validate(target, property, descriptor.value, previous)
    					&& cache.defineProperty(target, property, descriptor, previous)
    				) {
    					handleChangeOnTarget(target, property, descriptor.value, previous);
    				}
    			}

    			return true;
    		},

    		deleteProperty(target, property) {
    			if (!Reflect.has(target, property)) {
    				return true;
    			}

    			const previous = Reflect.get(target, property);
    			const isValid = validate(target, property, undefined, previous);

    			if (
    				isValid
    				&& cache.deleteProperty(target, property, previous)
    			) {
    				handleChangeOnTarget(target, property, undefined, previous);

    				return true;
    			}

    			return !isValid;
    		},

    		apply(target, thisArg, argumentsList) {
    			const thisProxyTarget = thisArg[proxyTarget] || thisArg;

    			if (cache.isUnsubscribed) {
    				return Reflect.apply(target, thisProxyTarget, argumentsList);
    			}

    			if (
    				(details === false
    					|| (details !== true && !details.includes(target.name)))
    				&& SmartClone.isHandledType(thisProxyTarget)
    			) {
    				let applyPath = path.initial(cache.getPath(target));
    				const isHandledMethod = SmartClone.isHandledMethod(thisProxyTarget, target.name);

    				smartClone.start(thisProxyTarget, applyPath, argumentsList);

    				let result = Reflect.apply(
    					target,
    					smartClone.preferredThisArg(target, thisArg, thisProxyTarget),
    					isHandledMethod
    						? argumentsList.map(argument => getProxyTarget(argument))
    						: argumentsList,
    				);

    				const isChanged = smartClone.isChanged(thisProxyTarget, equals);
    				const previous = smartClone.stop();

    				if (SmartClone.isHandledType(result) && isHandledMethod) {
    					if (thisArg instanceof Map && target.name === 'get') {
    						applyPath = path.concat(applyPath, argumentsList[0]);
    					}

    					result = cache.getProxy(result, applyPath, handler);
    				}

    				if (isChanged) {
    					const applyData = {
    						name: target.name,
    						args: argumentsList,
    						result,
    					};
    					const changePath = smartClone.isCloning
    						? path.initial(applyPath)
    						: applyPath;
    					const property = smartClone.isCloning
    						? path.last(applyPath)
    						: '';

    					if (validate(path.get(object, changePath), property, thisProxyTarget, previous, applyData)) {
    						handleChange(changePath, property, thisProxyTarget, previous, applyData);
    					} else {
    						smartClone.undo(thisProxyTarget);
    					}
    				}

    				if (
    					(thisArg instanceof Map || thisArg instanceof Set)
    					&& isIterator(result)
    				) {
    					return wrapIterator(result, target, thisArg, applyPath, prepareValue);
    				}

    				return result;
    			}

    			return Reflect.apply(target, thisArg, argumentsList);
    		},
    	};

    	const proxy = cache.getProxy(object, options.pathAsArray ? [] : '', handler);
    	onChange = onChange.bind(proxy);

    	if (hasOnValidate) {
    		options.onValidate = options.onValidate.bind(proxy);
    	}

    	return proxy;
    };

    onChange.target = proxy => (proxy && proxy[TARGET]) || proxy;
    onChange.unsubscribe = proxy => proxy[UNSUBSCRIBE] || proxy;

    class mainView extends AbstractView{
        constructor(appState,hash){
            super();
            this.hash=hash;
            this.AppState = appState;
            this.AppState = onChange(this.AppState, this.UpdateHookAppState.bind(this));
            this.state = onChange(this.state, this.loader.bind(this));
            this.settitle('Noiker GameApp');
        }

        UpdateHookAppState(path){  
            if (path=='favorites'){
                console.log(path);
            }
        }


        loader(path){
            if (path=='loading'){
                document.querySelector('main').innerHTML+=`<p>sdf</p>`;
            }  
        }


        state = {
            list: [],
            loading: false,
            searchQuery: undefined,
            offset: 0
        }


        async render(){
            this.state.loading=true;
            const main = await new Main(this.hash).render();
            await this.app.append(main);
            this.state.loading=false;
        }

        destroy(){
            try {
                document.getElementById('main').remove();
            } catch(e){
                console.error(`Не удается очистить main: ${e.message}`);
            }
        }
    }

    class Header{
        constructor(appState){
            this.element = document.createElement('header');
            this.AppState=appState;
        }

        render(){
            this.element.innerHTML=``;
            this.element.classList.add('header');
            this.element.innerHTML=`
                <div class="header__container container">
                    <div class="header__toggle" id="header__toggle">
                        <i class="ri-menu-line"></i>
                    </div>
                    <div class="header__nav" id='bigInputSearch'>
                        <input type='text' class='search__input'/>
                        <a href="#" class="header__logo">
                            <img src="./static/images/Logo.png" alt="Logo">
                        </a>
                    </div>
                </div>
        `;


            
            

            return this.element;
        }
    }

    async function genreMenu(){
        let genre_responce = await fetch('https://api.rawg.io/api/genres?key=91b914bf86944b2d9729ffa2c47d253f');
        genre_responce = await genre_responce.json();
        genre_responce = genre_responce.results;
        return genre_responce;
    }

    class Sidebar_Link {
        constructor(){
            this.element = document.createElement('a');
        }

        render(item){
            this.element.classList.add('sidebar__link');
            this.element.setAttribute('href', item.item_link);
            this.element.innerHTML=`
            ${item.item_icon}
            <span class="sidebar__link-name">${item.item_name}</span>
            <span class="sidebar__link-floating">${item.item_name}</span>
        `;
            return this.element;
        }
    }

    class Sidebar_Group extends DIVComponent{
        constructor(){
            super();
        }

         render(){
            this.element.classList.add('sidebar__content');
            navigationList.forEach(element => {
                if (element.title_group!=undefined){
                    this.element.innerHTML+=`
                    <h3 class="sidebar__title">
                        <span>${element.title_group}</span>
                    </h3>
                `;
                }
                element.items_group.forEach(el=>{
                    this.element.append(new Sidebar_Link().render(el));
                });
            });
            this.element.innerHTML+=`
            <h3 class="sidebar__title">
                <span>Genres</span>
            </h3>
        `;

            genreMenu().then(e=>{
                e.forEach(el=>{
                    document.querySelector('.sidebar__content').insertAdjacentHTML('beforeend',`
                <a class='sidebar__link' href='#games--${el.slug}'>
                    <img class='genre-img' src='${el.image_background}'>
                    <span class="sidebar__link-name">${el.name}</span>
                    <span class="sidebar__link-floating">${el.name}</span>
                </a>
                `);
                });
            });
          
            return this.element;
        }
    }

    class Sidebar{
        constructor(){
            this.element = document.createElement('aside');
        }




        async render(){
            this.element.innerHTML=``;
            this.element.classList.add('sidebar');
            this.element.setAttribute('id','sidebar');
            this.element.innerHTML=`
        <nav class="sidebar__container">
            <div class="sidebar__logo">
                <img src="./static/images/Logo-ico.svg" alt="Logo-ICO" class="sidebar__logo-img">
                <img src="./static/images/Logo-text.svg" alt="Logo-Text" class="sidebar__logo-text">
            </div>

                  ${await new Sidebar_Group().render().outerHTML}
      

            <div class="sidebar__account">
                <img src="./static/images/perfil.png" alt="sidebar image" class="sidebar__prefil">
            
                <div class="sidebar__names">
                    <h3 class="sidebar__name">Alex Vyugin</h3>
                    <span class="sidebar__email">noiker01@mail.ru</span>
                </div>

                <i class="ri-arrow-right-s-line"></i>
            </div>
        </nav>
        `;

            document.getElementById('header__toggle').addEventListener('click',()=>{
                document.getElementById('sidebar').classList.toggle('show-sidebar');
                document.getElementById('main').classList.toggle('main-pd');
                document.getElementById('bigInputSearch').classList.toggle('bigInputSearch');
            });
            
            const sidebarLink = document.querySelectorAll('.sidebar__link');
            
            sidebarLink.forEach(e=>e.addEventListener('click',function(){
                sidebarLink.forEach(el=>el.classList.remove('active-link'));
                this.classList.add('active-link');
            }));



            return this.element;
        }
    }

    //  view for statich HTML Head and Sidebar


    class ViewStatick extends AbstractView{
        constructor(){
            super();
        }
        renderHeader(){
            const header = new Header(this.AppState).render();
            this.app.prepend(header);
        }

        async renderSidebar(){
            const sidebar = await new Sidebar().render();
            await this.app.append(sidebar);
        }

    }

    class APP{
        // массив вьюшек и путей к ним
        routes = [
            {path: [''], view: mainView},
        ]
        // загрузка из jsona всех путей по мейн вью
        hashForMainView = navigationList.forEach(e=>{
            e.items_group.forEach(el=>{
                this.routes[0].path.push(el.item_link);
            });
            genreMenu().then(el=>{
                el.forEach(e=>{
                    this.routes[0].path.push(`#games--${e.slug}`);
                });
            });
        });

     
        AppState = {
            favorites:[],
        }
        constructor(){
            window.addEventListener('hashchange', this.route.bind(this));
            this.route();
            let statickView = new ViewStatick;
            statickView.renderHeader();
            statickView.renderSidebar();
        }

        route(){
            let route;
            // получаем необходимый объекст из массива routes
            for (let i=0; i<this.routes.length; i++){
                this.routes[i].path.find(e=>{
                    if (e==location.hash){
                        route = this.routes[i]; 
                    }
                });
            } 
      
            // currentView - Текущаю вьюшка
            this.currentView = new route.view(this.AppState, location.hash);
            // и вызов рендера у текущей вьюшки
            this.currentView.destroy();
            this.currentView.render();
            console.log(new Date());
        }
     
    }

    new APP();

})();
