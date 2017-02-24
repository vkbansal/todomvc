CURRDIR=$(pwd)
for dir in ./examples/*/
do
    pushd ${dir}
    $CURRDIR/node_modules/.bin/webpack --config $CURRDIR/$dir/webpack.config.js --progress --profile --colors
    popd
done
