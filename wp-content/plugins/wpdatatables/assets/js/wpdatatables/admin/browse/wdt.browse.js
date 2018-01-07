var duplicate_table_id = '';

(function($) {
    $(document).ready(function() {

        /**
         * Delete item action alert
         */
        $('.wdt-submit-delete').click(function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            $('#wdt-delete-modal').modal('show');

            var href = $(this).attr('href');

            $('#wdt-browse-delete-button').click(function () {
                window.location = href;
            });
        });

        /**
         * Bulk action alert
         */
        $('#doaction, #doaction2').click( function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            var select_box = $(this).siblings('div.wpdt-bulk-select').find('select.wpdt-bulk-select').val();

            if (select_box == -1) {
                return;
            }

            if ($('#wdt-datatables-browse-table table.widefat input[type="checkbox"]:checked').length == 0) {
                return;
            }

            $('#wdt-delete-modal').modal('show');

            $('#wdt-browse-delete-button').click(function () {
                $('#wdt-datatables-browse-table').submit();
            });
        });

        /**
         * Display a duplicate table modal
         */
        $('.wdt-duplicate-table').click(function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            duplicate_table_id = $(this).data('table_id');
            if ($(this).data('table_type') === 'manual') {
                $('.wdt-duplicate-manual-table').show();
            } else {
                $('.wdt-duplicate-manual-table').hide();
            }

            $('input.wdt-duplicate-table-name').val($(this).data('table_name')+ '_' + wpdatatablesStrings.copy.toLowerCase());

            $('#wdt-duplicate-table-modal').modal('show');
        });

        /**
         * A duplicate table action
         */
        $(document).on('click','button.duplicate-table-button',function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            $('#wdt-preload-layer').show();
            var new_table_name = $(this).closest('.modal-content').find('input.wdt-duplicate-table-name').val();
            var manual_duplicate_input = ($('input[name=wdt-duplicate-database]').is(':checked')) ? 1 : 0;
            var wdtNonce = $('#wdtNonce').val();

            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'wpdatatables_duplicate_table',
                    table_id: duplicate_table_id,
                    new_table_name: new_table_name,
                    manual_duplicate_input: manual_duplicate_input,
                    wdtNonce: wdtNonce
                },
                success: function() {
                    window.location.reload();
                }
            });

            $('#wdt-duplicate-table-modal').modal('hide');

        });

        /**
         * Highlight a row when checkbox is active
         */
        $(document).on('click','.wdt-datatables-admin-wrap .card.wdt-browse-table table tbody :checkbox',function() {
            var parent_tr = $(this).closest('tr');

            if ($(this).is(':checked')) {
                parent_tr.addClass('checked-row');
            } else {
                parent_tr.removeClass('checked-row');
            }
        });

        /**
         * Highlight all rows when the select all checkbox is active
         */
        $(document).on('click','.wdt-datatables-admin-wrap .card.wdt-browse-table table thead :checkbox, .wdt-datatables-admin-wrap .card.wdt-browse-table table tfoot :checkbox',function() {
            var all_tr = $(this).closest('table').find('tbody tr');

            if ($(this).is(':checked')) {
                all_tr.addClass('checked-row');
            } else {
                all_tr.removeClass('checked-row');
            }
        });
    });
})(jQuery);
