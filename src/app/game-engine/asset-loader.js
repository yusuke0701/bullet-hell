// アセットローダークラスは、アセットを読み込む役割をもつ
export class AssetLoader {
    constructor() {
        this._promises = [];
        this._assets = new Map();
    }

    addImage(name, url) {
        const img = new Image();
        img.src = url;

        const promise = new Promise((resolve, reject) =>
            img.addEventListener('load', e => {
                this._assets.set(name, img);
                resolve(img);
            }));

        this._promises.push(promise);
    }

    loadAll() {
        return Promise.all(this._promises).then(p => this._assets);
    }

    get(name) {
        return this._assets.get(name);
    }
}

export const assets = new AssetLoader();