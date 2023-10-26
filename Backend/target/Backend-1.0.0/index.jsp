<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Server</title>

    <style>
        body {
            background-color: black;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        div {
            display: inline-block;
            text-align: center;
        }

        h3, h1 {
            user-select: none;
            font-family: "JetBrains Mono",serif;
            color: #00ff23;
            margin: 0;
        }

        h1 {
            font-size: 24px; /* Adjust the font size as needed */
            overflow: hidden;
            white-space: nowrap;
            animation: typewriter 2s steps(15) infinite reverse;
        }

        @keyframes typewriter {
            0% { width: 0; }
            50% { width: 100%; }
            100% { width: 0; }
        }
    </style>
</head>
<body>
<div>
    <h3>Server is running</h3>
    <h1>. . . . . . . . . .</h1>
</div>
</body>
</html>

