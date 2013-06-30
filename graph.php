<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <link rel="stylesheet" href="static/css/style.css" />
        <!-- Bootstrap -->
        <link href="static/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
        <link href="static/bootstrap/css/bootstrap-responsive.css" rel="stylesheet">

        <title></title>
    </head>
    <body>
        <div class="navbar navbar-inverse navbar-fixed-top">
            <div class="navbar-inner">
                <div class="container">
                    <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </a>
                    <a class="brand" href="#">Twitter Neighbours</a>
                    <div class="nav-collapse collapse">
                        <ul class="nav">
                            <li class="active"><a href="#">Home</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div><!--/.nav-collapse -->
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <h2>Graph</h2>

            </div>
            <div class="alert alert-block alert-error fade in" id="rateAlert" style="display: none;">
                <!--<button type="button" class="close" data-dismiss="alert">×</button>-->
                <h4 class="alert-heading">Oh snap! You got rate limited!</h4>
                <p>Time remaining for being able to work again: <span id="timeLeft">00:00</span></p>
                <p>
                    <a class="btn" href="#">Learn More</a>
                </p>
            </div>
            <div class="row">
                <div class="span2 offset1">
                    <button data-toggle="button" type="button" class="btn" id="forceatlas2" >Toggle FA2</button>
                </div>
                <div class="span2 offset5">
                    <button type="button" class="btn" id="loadMore">Moar</button>
                </div>
            </div>
            <div class="row">
                <div class="well" id="infoText">
                    Bardzo dobrze!
                </div>
            </div>
            <div class="row">    
                <div class="span12 sigma-parent" id="sigma-parent">
                    <div class="sigma-expand" id="sigma"></div>
                </div>
            </div> 
            <div class="row well" style="display: none;" id="pbContainer">
                <div class="progress progress-striped active">
                    <div class="bar" style="width: 100%;" id="progressbar"></div>
                </div>
            </div>
        </div> <!-- /container -->


<!--        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>-->
        <script src="static/js/jquery-1.8.3.js"></script>
        <script src="static/bootstrap/js/bootstrap.min.js"></script>
        <script src="static/js/sigma.min.js"></script>
        <script src="static/js/sigma.fisheye.js"></script>
        <script src="static/js/sigma.forceatlas2.js"></script>
        <script src="static/js/sigma.twittertag.js"></script>
        <script src="static/js/twittneighbours.js" ></script>
        <style type="text/css">
            /* sigma.js context : */
            .sigma-parent {
                position: relative;
                border-radius: 4px;
                -moz-border-radius: 4px;
                -webkit-border-radius: 4px;
                background: #222;
                height: 500px;
            }
            .sigma-expand {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
            }
            .buttons-container{
                padding-bottom: 8px;
                padding-top: 12px;
            }
        </style>
    </body>
</html>
