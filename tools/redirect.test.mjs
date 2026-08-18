import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";

const repoRoot = path.resolve(import.meta.dirname, "..");
const redirectSource = await readFile(path.join(repoRoot, "public", "redirect.js"), "utf8");

function redirectFor(pathname, search = "", hash = "") {
  let destination;
  vm.runInNewContext(redirectSource, {
    window: {
      location: {
        pathname,
        search,
        hash,
        replace(value) {
          destination = value;
        }
      }
    }
  });
  return destination;
}

test("redirects the legacy root to the new apex", () => {
  assert.equal(redirectFor("/iching-oracle-public/"), "https://ichingdialogue.app/");
});

test("preserves privacy, unknown paths, query, and fragment", () => {
  assert.equal(
    redirectFor("/iching-oracle-public/privacy-policy/", "?source=store", "#data"),
    "https://ichingdialogue.app/privacy-policy/?source=store#data"
  );
  assert.equal(
    redirectFor("/iching-oracle-public/ru/monety/", "?utm_source=legacy"),
    "https://ichingdialogue.app/ru/monety/?utm_source=legacy"
  );
});

test("never derives a destination host from the legacy path", () => {
  assert.equal(
    redirectFor("/iching-oracle-public//example.com/path"),
    "https://ichingdialogue.app//example.com/path"
  );
});
