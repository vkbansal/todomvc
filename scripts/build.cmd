@echo off
FOR /D %%f in (%CD%\examples\*) do (
    pushd %%f
    build.cmd
    popd
)
