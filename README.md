# Photo Market

***

## 【Introduction of Photo Market】
- This app is based on image sharing app where a user can share his image on site and anybody connected to this site can give him tips for his/her image with blockchain mechanism

&nbsp;

## 【Video Overview】

***

Demo video link : https://drive.google.com/file/d/1Oah1st76PG27CrzFhOraYHs4dDETHpmn/view?usp=sharing


## 【Screenshots】
![PM3](https://user-images.githubusercontent.com/37343956/141669886-c51c2a79-f9dc-46a3-be4f-1ac80fd15f65.png)

![PM1](https://user-images.githubusercontent.com/37343956/141669889-f6fb3b32-90aa-47e6-886e-2579f1189fc5.png)
![pm](https://user-images.githubusercontent.com/37343956/141669892-317bd734-1fa7-4f50-952d-7a13042d9d27.png)
![pm4](https://user-images.githubusercontent.com/37343956/141669898-b359d792-c8b8-4432-be8b-4e2a7379e9fc.png)

## 【Setup】

### Setup private network by using Ganache-CLI
1. Download Ganache-CLI from link below  
https://www.trufflesuite.com/ganache  


2. Execute Ganache   (If you want to use local test network .You can also use Rinkby,ropsten,kovan test network also)
```
$ ganache-cli -d
```
※ `-d` option is the option in order to be able to use same address on Ganache-CLI every time.

&nbsp;


### Setup wallet by using Metamask
1. Add MetaMask to browser (Chrome or FireFox or Opera or Brave)    
https://metamask.io/  


2. Adjust appropriate newwork below 
```
http://127.0.0.1:7545
```

&nbsp;


### Setup backend
1. Deploy contracts to private network of Ganache
```
(root directory)

$ truffle migrate --reset development/rinkby/ropsten/kovan
```

&nbsp;


### Setup frontend
1. NPM modules install
```
$ cd client
$ npm install

```

2. Execute command below in root directory.
```
$ cd ..
$ npm run start
```

3. Access to browser by using link 
```
http://localhost:3000
```

&nbsp;

***
