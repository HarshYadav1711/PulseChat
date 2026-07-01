import { execSync } from "node:child_process";

const port = process.argv[2] ?? "3001";

function freePortOnWindows(targetPort) {
  let output = "";

  try {
    output = execSync(`netstat -ano | findstr :${targetPort}`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
  } catch {
    return;
  }

  const pids = new Set();

  for (const line of output.split(/\r?\n/)) {
    if (!line.includes("LISTENING")) {
      continue;
    }

    const pid = line.trim().split(/\s+/).at(-1);

    if (pid && pid !== "0") {
      pids.add(pid);
    }
  }

  for (const pid of pids) {
    execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
    console.log(`[pulsechat] Freed port ${targetPort} (stopped PID ${pid})`);
  }
}

function freePortOnUnix(targetPort) {
  try {
    const output = execSync(`lsof -ti tcp:${targetPort}`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });

    for (const pid of output.split(/\r?\n/).filter(Boolean)) {
      execSync(`kill -9 ${pid}`, { stdio: "ignore" });
      console.log(`[pulsechat] Freed port ${targetPort} (stopped PID ${pid})`);
    }
  } catch {
    return;
  }
}

if (process.platform === "win32") {
  freePortOnWindows(port);
} else {
  freePortOnUnix(port);
}
