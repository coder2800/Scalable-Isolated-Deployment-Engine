const express = require("express");

const { generateSlug } = require("random-word-slugs");
const { ECSClient, RunTaskCommand } = require("@aws-sdk/client-ecs");

const app = express();
const PORT = 9000;

const ecsClient = new ECSClient({
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});

const config = {
  CLUSTER: "",
  TASK: "",
};

app.use(express.json());

app.post("/project", (req, res) => {
  const { gitUrl } = req.body;
  const projectSlug = generateSlug();

  //spin the container

  const command = new RunTaskCommand({
    cluster: config.CLUSTER,
    taskDefinition: config.TASK,
    launchType: "FARGATE",
    count: 1,
    networkConfiguration: {
      awsvpcConfiguration: {
        assignPublicIp: "ENABLED",
        subnets: [""],
        securityGroups: [""],
      },
    },
    overrides: {
      containerOverrides: [
        {
          name: "",
          environment: [
            {name: ""}
          ],
        },
      ],
    },
  });
});
