# XRPLD-Cli

## Global Usage (For using as a cli)

Install:

`npm i -g xrpld-cli`

Use:

`xrpld-cli up`

### Starting the Development Environment

To start the development environment, you can use the following commands:

### Local Up

```shell
xrpld-cli up
```

### Debugging the Development Environment

To debug the Development Environment and monitor the execution of hooks, you can use the following command:

```shell
xrpld-cli trace
```

This command will run the `tail -f debug.log | grep HookTrace` stream the debug logs in real-time and filter for lines containing "HookTrace". It allows you to monitor the execution of hooks and identify any issues or errors.

As you interact with the XRPL or trigger hooks, you will see the corresponding debug log entries in the terminal. This can help you troubleshoot and debug any unexpected behavior or errors related to the execution of hooks.

To stop streaming the debug logs, press `Ctrl + C` in the terminal.

Using the `tail -f debug.log | grep HookTrace` command provides a convenient way to monitor the execution of hooks and debug the Development Environment.

### Xrpld Down

```shell
xrpld-cli down
```

The `xrpld down` command will stop and remove the Docker containers defined in the `docker-compose.yml` file. The `--remove-orphans` flag ensures that any orphaned containers are also removed.

### Xrpld Down with Container Removal

```shell
xrpld-cli down:clean
```

The `xrpld down:clean` command will stop and remove the Docker containers defined in the `docker-compose.yml` file, as well as any orphaned containers. It will also remove all the contents from the db and debug log folders. 

## Development / Deployment

### Build Repo

`yarn run build`

### Build Executable Package

`pkg .`

### Publish NPM Package

`npm publish`