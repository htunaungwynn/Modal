'use strict';

angular.module('msAngular.msShopAdmin')
  .directive('msModal',['$timeout', function ($timeout) {
    return{
      restrict: 'A',
      link: function (scope, element, attrs) {
        $timeout(function(){ //need this timeout see http://blog.brunoscopelliti.com/run-a-directive-after-the-dom-has-finished-rendering
          var
            modalClass = (attrs.msModalClass) ? attrs.msModalClass : '',
            modalContent = angular.element('#' + attrs.msModal),
            modal = angular.element('#modal'),
            modalOverlay = angular.element('#modal-overlay'),
            modalWrapperId = attrs.msModal + '-modal-wrapper';

          if (attrs.msModal === '') {
            throw new Error('You must supply the id of the modal content, e.g. ms-modal="my-modal-content"');
          }

          if (modalContent.length === 0) {
            throw new Error('Could not find your modal content');
          }

          //wrap modal content so we can find it later
          
          modalContent.wrap('<div class="modal-wrapper" id="' + modalWrapperId + '"></div>');

          element.on('click', function() {
            modal.addClass(modalClass);
            modalOverlay.addClass(modalClass);
            modal.append(modalContent);
            modal.addClass('show');
            modalOverlay.addClass('show-overlay');
            modal.find('input').eq(0).trigger('focus');
          });

          function close(){
            modal.removeClass('show');
            modalOverlay.removeClass('show-overlay');
            $timeout(function(){
              modalOverlay.removeClass(modalClass);
            }, 500);
            angular.element('#' + modalWrapperId).append(modalContent);
            modal.removeClass(modalClass);
          }

          modal.on('click', '.modal-close', function() {
            close();
          });

          scope.$on('modalClose', function() {
            close();
          });

          modalOverlay.on('click', function() {
            close();
          });

        },0);
      }
    };
  }]);