module.exports = {
	//唯一入口文件
	entry : "./js/main.js",
	//打包后文件
	output : {
		path : __dirname,		//打包后文件路径
		filename : "bundle.js"	//打包后文件名称
	},

	/*npm install --save-dev webpack-dev-server
	使用webpack构建本地服务器
	devServer: {
		post: 80,//端口号,默认8080
	    contentBase: "./public",//本地服务器所加载的页面所在的目录
	    historyApiFallback: true,//不跳转
	    inline: true//实时刷新
	}
	npm run server
	*/
	module : {
		rules : [
			{
				test : /(\.js | \.jsx)$/, 
				use : {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "es2015", "react"
                        ]
                    }
                },
                exclude: /node_modules/
			},
			{
				test : /\.css$/,
				use : [{
					loader : "style-loader"
				},{
					loader : "css-loader",
					options: {
                        modules: true
                    }
				}]
			}
		]
	}
};