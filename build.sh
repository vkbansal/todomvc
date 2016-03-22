for dir in ./examples/*/
do
    #dir=${dir%*/}
    cd ${dir}
    ./build.sh
done
