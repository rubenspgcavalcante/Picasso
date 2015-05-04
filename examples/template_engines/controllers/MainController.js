var MainController = Picasso.Controller.extend(function (underscoreView, handlebarsView, dustView) {
    this.construct({}, underscoreView, handlebarsView);
    this.panels = {handlebars: new PanelModel(), underscore: new PanelModel(), dust: new PanelModel()};

    this.panels.handlebars.update({title: 'Handlebars template', content: 'Rendering with Handlebars!'});
    this.panels.underscore.update({title: 'Underscore template', content: 'Rendering with Underscore!'});
    this.panels.dust.update({title: 'Dust template', content: 'Rendering with dust'});

    this.listen('btn-click', function (event) {
        alert('Click listened from ' + event.data + ' view');
    });

    this.startApp = function () {
        handlebarsView.render(this.panels.handlebars);
        underscoreView.render(this.panels.underscore);
        dustView.render(this.panels.dust);
    };
});