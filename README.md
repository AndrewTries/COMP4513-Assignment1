# COMP4513-Assignment1

## Overview

This is a project containing APIs for artist data - artists, eras, galleries, genres, paintinggenres, paintings, shapes. The data is returned in a Json format

## Built with 

**Node Js** - JS runtime

**Express** - Routing

**Render** - Hosting - https://comp4513-assignment1-4lpi.onrender.com

## API Endpoints

| API Endpoint | Description | Test Links |
| --- | --- | --- |
| `/api/eras` | Returns all the eras | [/api/eras](https://comp4513-assignment1-4lpi.onrender.com/api/eras) |
| `/api/galleries` | Returns all the galleries (for this, and other gallery requests, return all the fields in the galleries table) | [/api/galleries](https://comp4513-assignment1-4lpi.onrender.com/api/galleries) |
| `/api/galleries/ref` | Returns just the specified gallery (use the galleryId field), e.g., `/api/galleries/30` | [/api/galleries/30](https://comp4513-assignment1-4lpi.onrender.com/api/galleries/30) <br> [/api/galleries/calgary](https://onrender.com) |
| `/api/galleries/country/substring` | Returns the galleries whose galleryCountry (case insensitive) begins with the provided substring, e.g., `/api/galleries/country/fra` | [/api/galleries/country/fra](https://comp4513-assignment1-4lpi.onrender.com/api/galleries/country/fra) |
| `/api/artists` | Returns all the artists (for this, and other artist requests, return all the fields in the artists table) | [/api/artists](https://comp4513-assignment1-4lpi.onrender.com/api/artists) |
| `/api/artists/ref` | Returns just the specified artist (use the artistId field), e.g., `/api/artists/12` | [/api/artists/12](https://comp4513-assignment1-4lpi.onrender.com/api/artists/12) <br> [/api/artists/1223423](https://onrender.com) |
| `/api/artists/search/substring` | Returns the artists whose last name (case insensitive) begins with the provided substring, e.g., `/api/artist/search/ma` | [/api/artists/search/ma](https://comp4513-assignment1-4lpi.onrender.com/api/artists/search/ma) [/api/artists/search/mA](https://comp4513-assignment1-4lpi.onrender.com/api/artists/search/mA) |
| `/api/artists/country/substring` | Returns the artists whose nationality (case insensitive) begins with the provided substring, e.g., `/api/artists/country/fra` | [/api/artists/country/fra](https://comp4513-assignment1-4lpi.onrender.com/api/artists/country/fra) |
| `/api/genres` | Returns all the genres. For this and the following genres requests, don’t just provide the foreign keys for era; instead provide all the era fields | [/api/genres](https://comp4513-assignment1-4lpi.onrender.com/api/genres) |
| `/api/genres/ref` | Returns just the specified genre (use the genreId field), e.g., `/api/genres/76` | [/api/genres/76](https://comp4513-assignment1-4lpi.onrender.com/api/genres/76) |
| `/api/genres/painting/ref` | Returns the genres used in a given painting (order by genreName in ascending order), e.g., `/api/genres/painting/408` | [/api/genres/painting/408](https://comp4513-assignment1-4lpi.onrender.com/api/genres/painting/408) [/api/genres/painting/jsdfhg](https://onrender.com) |
| `/api/paintings/single/ref` | Returns just the specified painting, e.g., `/api/paintings/single/63` | [/api/paintings/single/63](https://comp4513-assignment1-4lpi.onrender.com/api/paintings/single/63) |
| `/api/paintings/sort/title\|year/limit/ref` | Returns paintings sorted (lowest to highest) by either title or yearOfWork. For this and the following paintings requests,  The number of paintings returned is specified by ref, e.g., the following returns the first 12 paintings: `/api/paintings/sort/year/limit/12` \| If limit is 0, then return all the paintings. \| | [/api/paintings/sort/title/limit/10](https://comp4513-assignment1-4lpi.onrender.com/api/paintings/sort/title/limit/10) [/api/paintings/sort/year/limit/10](https://comp4513-assignment1-4lpi.onrender.com/api/paintings/sort/year/limit/10) [/api/paintings/sort/absd/limit/10](https://onrender.com) [/api/paintings/sort/year/limit/asd](https://onrender.com) [/api/paintings/sort/year/limit](https://comp4513-assignment1-4lpi.onrender.com/api/paintings/sort/year/limit) |
| `/api/paintings/sort/title\|year/limit/ref/skip/ref2` | Instead of returning the first paintings, skip the records specified by ref2, e.g., the following returns paintings 31-40 `/api/paintings/sort/year/limit/10/skip/30` | [/api/paintings/sort/year/limit/10/skip/30](https://comp4513-assignment1-4lpi.onrender.com/api/paintings/sort/year/limit/10/skip/30) [/api/paintings/sort/year/limit/10/skip/30000](https://onrender.com) [/api/paintings/sort/year/limit/10/skip](https://comp4513-assignment1-4lpi.onrender.com/api/paintings/sort/year/limit/10/skip) |
| `/api/paintings/search/substring` | Returns the paintings whose title (case insensitive) contains the provided substring (sorted by year), e.g., `/api/paintings/search/port` | [/api/paintings/search/port](https://comp4513-assignment1-4lpi.onrender.com/api/paintings/search/port) [/api/paintings/search/pORt](https://comp4513-assignment1-4lpi.onrender.com/api/paintings/search/pORt) [/api/paintings/search/connolly](https://onrender.com) |
| `/api/paintings/years/start/end` | Returns the paintings between two years (include the paintings in the provided years), sorted by year, e.g., `/api/paintings/years/1800/1850` | [/api/paintings/years/1800/1850](https://comp4513-assignment1-4lpi.onrender.com/api/paintings/years/1800/1850) [/api/paintings/years/1850/1800](https://onrender.com) |
| `/api/paintings/galleries/ref` | Returns all the paintings in a given gallery (use the galleryId field), sorted by year, e.g., `/api/paintings/galleries/5` | [/api/paintings/galleries/5](https://comp4513-assignment1-4lpi.onrender.com/api/paintings/galleries/5) |
| `/api/paintings/artist/ref` | Returns all the paintings by a given artist (use the artistId field), sorted by year, e.g., `/api/paintings/artist/16` | [/api/paintings/artist/16](https://comp4513-assignment1-4lpi.onrender.com/api/paintings/artist/16) [/api/paintings/artist/666](https://onrender.com) |
| `/api/paintings/genre/ref` | Returns all the paintings for a given genre (use the genreId field), e.g., `/api/paintings/genre/78` Sort by yearOfWork. | [/api/paintings/genre/78](https://comp4513-assignment1-4lpi.onrender.com/api/paintings/genre/78) |
| `/api/paintings/era/ref` | Returns all the paintings for a given era (use the eraId field), e.g., `/api/paintings/era/2` Sort by yearOfWork. | [/api/paintings/era/2](https://comp4513-assignment1-4lpi.onrender.com/api/paintings/era/2) |
| `/api/counts/genres` | Returns the genre name and the number of paintings for each genre, sorted by the number of paintings (fewest to most). | [/api/counts/genres](https://comp4513-assignment1-4lpi.onrender.com/api/counts/genres) |
| `/api/counts/artists` | Returns the artist name (first name space last name) and the number of paintings for each artist, sorted by the number of paintings (most to fewest). | [/api/counts/artists](https://comp4513-assignment1-4lpi.onrender.com/api/counts/artists) |
| `/api/counts/topgenres/ref` | Returns the genre name and the number of paintings for each genre, sorted by the number of paintings (most to least) for genres having over some set number of paintings, e.g., `/api/counts/topgenres/20` would show the painting counts for those genres with more than 20 paintings. | [/api/counts/topgenres/20](https://comp4513-assignment1-4lpi.onrender.com/api/counts/topgenres/20) [/api/counts/topgenres/2034958](https://onrender.com) |