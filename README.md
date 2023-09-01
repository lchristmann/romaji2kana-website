# Romaji2Kana Website <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->

- [1. Installations \& Build](#1-installations--build)
- [2. Cloud Infrastructure](#2-cloud-infrastructure)
- [3. Deployment (CI/CD Pipeline)](#3-deployment-cicd-pipeline)

<br>

## 1. Installations & Build

<!-- TBD

<br>

### 1.1. Requirements

| Program | Min. Version | Check if installed |
|---|---|---|
| Ruby | Version 2.5.0 or higher | `ruby -v` |
| RubyGems | - | `gem -v` |
| GCC | - | `gcc -v` and `g++ -v` |
| Make | - | `make -v` |
| Bundler | - | `bundle -v` |

<br>

### 1.2. Build

To install the project's dependencies: run `bundle install` in the root directory of this project.

To have the website up and running locally on port 4000: execute `bundle exec jekyll serve` or just `jekyll serve`.

To remove the generated files: `jekyll clean` and delete the `Gemfile.lock` file.

-->

<br>

## 2. Cloud Infrastructure

The following diagram shows the cloud infrastructure the site is running on.

![Cloud Architecture Diagram](cloud-architecture.drawio.svg)

1. Incoming requests to the domain `romaji2kana.com` first arrive at **Route53**, because it has the authoritative name servers responsible for my domain. Here will be the value of the "DNS A record" returned, which is `d15f3h5j74nmwf.cloudfront.net`.
2. This value is the endpoint of my **CloudFront** distribution (a content delivery network). It serves cached copies of my static website's files, which I have put in an S3 bucket.
3. This CloudFront distribution takes a SSL certificate created for "romaji2kana.com" in **AWS Certificate Manager** and applies it to the website's connections.
4. The origin from which CloudFront takes these website files is an **S3 bucket** named "romaji2kana.com", where I put all the static files that make up my website.

<br>

Explanation of the different regions:

- Route53 and CloudFront are global services
- the S3 bucket is located in Frankfurt (eu-central-1), because it's is the preferred and closest region for me
- the SSL certificate is located in North Virginia (us-east-1), because this is the only region allowed by the CloudFront service for certificates.

<br>

## 3. Deployment (CI/CD Pipeline)

A GitHub Actions CI/CD pipeline synchronizes all `.html` files and the `logo.svg` file to the S3 bucket.

![CI/CD Pipeline](cicd-pipeline.drawio.svg)

This pipeline will be triggered by every commit in the Git repository.

1. A GitHub runner will checkout the code in the repository.
2. It will deploy the files to the "romaji2kana.com" S3 bucket.
3. It will invalidate the CloudFront distribution's cache, so the changes are are effective immediately.

<br>