const { connection } = require("./mysql");
const faker = require("faker");

const cliProgress = require('cli-progress');

// create a new progress bar instance and use shades_classic theme
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const limit = process.argv[2] || 20000;

// start the progress bar with a total value of 200 and start value of 0
bar1.start(limit, 0);
for (let i = 1; i <= limit; i++) {

    const sql = "INSERT INTO `users` (`firstname`, `lastname`, `email`, `age`) VALUES ('" + faker.name.findName() + "', '" + faker.name.findName() + "', '" + faker.internet.email() + "', '" + Math.floor(Math.random() * 100) + "')";

    connection.query(
        sql,
        function(err, results, fields) {
            bar1.update(i);
            if (i === limit) {
                // stop the progress bar
                bar1.stop();
                process.exit(1);
            }
        }
    );

}